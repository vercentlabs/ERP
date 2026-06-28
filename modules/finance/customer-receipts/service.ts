import { getTenantKnex } from "@vercent/database/knex";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { createAccountingRepository } from "../accounting/repository";
import { accountingService, createAccountingService } from "../accounting/service";
import type { JournalEntryRecord } from "../accounting/types";
import { masterDataRepository } from "../../master-data/foundation/repository";
import type { MasterDataRepository } from "../../master-data/foundation/types";
import { createSalesInvoicesRepository, salesInvoicesRepository } from "../../sales/invoices/repository";
import type { SalesInvoiceRecord, SalesInvoiceRepository } from "../../sales/invoices/types";
import { createAuditEvent } from "./audit";
import { events } from "./events";
import { permissions } from "./permissions";
import { createCustomerReceiptsRepository, customerReceiptsRepository } from "./repository";
import { customerReceiptCreateSchema, customerReceiptListSchema, customerReceiptUpdateSchema, postCustomerReceiptSchema } from "./schemas";
import type {
  CustomerReceiptActionContext,
  CustomerReceiptAllocationInput,
  CustomerReceiptAllocationRecord,
  CustomerReceiptCreateInput,
  CustomerReceiptRepository,
  CustomerReceiptUpdateInput,
} from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => { if (!decision.allowed) throw new Error(decision.reasons.join("; ")); };
const assertPermission = (context: CustomerReceiptActionContext, permission: string, record?: unknown) => assertAllowed(evaluatePolicy({ actor: context, permission, record: record as never }));
const assertFound = <T>(record: T | undefined, label: string) => { if (!record) throw new Error(`${label} was not found`); return record; };
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function createCustomerReceiptsService(
  repository: CustomerReceiptRepository = customerReceiptsRepository,
  masterData: MasterDataRepository = masterDataRepository,
  invoices: SalesInvoiceRepository = salesInvoicesRepository,
  accounting: typeof accountingService = accountingService,
) {
  async function normalizeHeader(input: CustomerReceiptCreateInput | CustomerReceiptUpdateInput, tenantId: string) {
    if (!input.customerId) return input;
    const customer = assertFound(await masterData.getCustomerById(tenantId, input.customerId), "Customer");
    if (customer.status !== "ACTIVE") throw new Error("Customer must be active");
    return { ...input, partyId: input.partyId ?? customer.partyId, currency: input.currency ?? customer.currency ?? "INR" };
  }

  async function buildAllocations(tenantId: string, customerId: string, inputAllocations: CustomerReceiptAllocationInput[], invoiceRepository: SalesInvoiceRepository = invoices) {
    const allocations: CustomerReceiptAllocationRecord[] = [];
    for (const input of inputAllocations) {
      const invoice = assertFound(await invoiceRepository.getSalesInvoiceById(tenantId, input.salesInvoiceId), "Sales invoice");
      validatePayableInvoice(invoice, customerId, input.allocatedAmount);
      allocations.push({
        id: crypto.randomUUID(),
        receiptId: "",
        salesInvoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        invoiceTotalAmount: invoice.totalAmount,
        invoiceAmountDueBefore: invoice.amountDue,
        allocatedAmount: roundMoney(input.allocatedAmount),
        invoiceAmountDueAfter: roundMoney(invoice.amountDue - input.allocatedAmount),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    return allocations;
  }

  function validatePayableInvoice(invoice: SalesInvoiceRecord, customerId: string, allocatedAmount: number) {
    if (invoice.customerId !== customerId) throw new Error("Receipt invoice must belong to the same customer");
    if (invoice.status !== "ISSUED") throw new Error("Only ISSUED sales invoices can be paid");
    if (invoice.accountingStatus !== "POSTED") throw new Error("Sales invoice must be posted to accounting before receipt posting");
    if (invoice.deletedAt) throw new Error("Deleted sales invoices cannot be paid");
    if (allocatedAmount <= 0) throw new Error("Allocation amount must be greater than zero");
    if (roundMoney(allocatedAmount) > roundMoney(invoice.amountDue)) throw new Error("Allocation cannot exceed invoice amount due");
  }

  function assertAmountMatches(amountReceived: number, allocations: CustomerReceiptAllocationRecord[]) {
    const allocated = roundMoney(allocations.reduce((sum, allocation) => sum + allocation.allocatedAmount, 0));
    if (roundMoney(amountReceived) !== allocated) throw new Error("Amount received must equal total allocated amount");
    return allocated;
  }

  async function assertDepositAccount(tenantId: string, accountId: string, context: CustomerReceiptActionContext, accountingClient: typeof accountingService) {
    const account = await accountingClient.getAccountById(tenantId, accountId, context);
    if (!account.isActive) throw new Error("Deposit account must be active");
    if (!account.isCashAccount && !account.isBankAccount) throw new Error("Deposit account must be a cash or bank account");
    return account;
  }

  async function buildReceiptJournal(receipt: Awaited<ReturnType<CustomerReceiptRepository["getCustomerReceiptById"]>>, context: CustomerReceiptActionContext, accountingClient: typeof accountingService) {
    const current = assertFound(receipt, "Customer receipt");
    const settings = await accountingClient.getAccountingSettings(current.tenantId, context, current.companyId, current.branchId);
    if (!settings) throw new Error("Accounting settings are required before posting receipts");
    const arAccount = await accountingClient.getAccountById(current.tenantId, settings.accountsReceivableAccountId, context);
    if (!arAccount.isActive) throw new Error("Accounts receivable account must be active");
    await assertDepositAccount(current.tenantId, current.depositAccountId, context, accountingClient);
    const postingDate = current.postingDate ?? current.receiptDate;
    const fiscalYear = await accountingClient.resolveOpenFiscalYearForDate(current.tenantId, postingDate, context, current.companyId);
    return accountingClient.createJournalEntry({
      tenantId: current.tenantId,
      companyId: current.companyId,
      branchId: current.branchId,
      journalDate: current.receiptDate,
      postingDate,
      fiscalYearId: fiscalYear.id,
      referenceType: "CUSTOMER_RECEIPT",
      referenceId: current.id,
      sourceModule: "FINANCE",
      narration: `Customer receipt ${current.receiptNumber}`,
      lines: [
        { accountId: current.depositAccountId, debitAmount: current.amountReceived, narration: `Customer receipt ${current.receiptNumber}` },
        { accountId: settings.accountsReceivableAccountId, customerId: current.customerId, partyId: current.partyId, creditAmount: current.amountReceived, narration: `Customer receipt ${current.receiptNumber}` },
      ],
    }, context) as Promise<JournalEntryRecord>;
  }

  return {
    async list(input: unknown, context: CustomerReceiptActionContext) {
      const parsed = customerReceiptListSchema.parse(input);
      assertPermission(context, permissions.view);
      return repository.listCustomerReceipts(parsed);
    },
    async stats(input: unknown, context: CustomerReceiptActionContext) {
      const parsed = customerReceiptListSchema.pick({ tenantId: true, companyId: true, branchId: true }).parse(input);
      assertPermission(context, permissions.view);
      return repository.getCustomerReceiptStats(parsed.tenantId, parsed);
    },
    async getById(tenantId: string, id: string, context: CustomerReceiptActionContext) {
      const receipt = assertFound(await repository.getCustomerReceiptById(tenantId, id), "Customer receipt");
      assertPermission(context, permissions.view, receipt);
      return receipt;
    },
    async create(input: unknown, context: CustomerReceiptActionContext) {
      const parsed = customerReceiptCreateSchema.parse(input) as CustomerReceiptCreateInput;
      assertPermission(context, permissions.create);
      const normalized = (await normalizeHeader(parsed, parsed.tenantId)) as CustomerReceiptCreateInput;
      const allocations = await buildAllocations(parsed.tenantId, normalized.customerId, parsed.allocations);
      assertAmountMatches(parsed.amountReceived, allocations);
      const created = await repository.createCustomerReceipt(normalized, allocations, context.actorId);
      createAuditEvent("created", created.tenantId, created.id, context.actorId, { event: events.created });
      return created;
    },
    async createFromInvoice(tenantId: string, invoiceId: string, input: unknown, context: CustomerReceiptActionContext) {
      const invoice = assertFound(await invoices.getSalesInvoiceById(tenantId, invoiceId), "Sales invoice");
      const body = input as Partial<CustomerReceiptCreateInput>;
      return this.create({
        tenantId,
        customerId: invoice.customerId,
        partyId: invoice.partyId,
        amountReceived: body.amountReceived ?? invoice.amountDue,
        paymentMethod: body.paymentMethod ?? "BANK_TRANSFER",
        depositAccountId: body.depositAccountId,
        receiptDate: body.receiptDate,
        postingDate: body.postingDate,
        referenceNumber: body.referenceNumber,
        referenceDate: body.referenceDate,
        currency: body.currency ?? invoice.currency,
        exchangeRate: body.exchangeRate ?? invoice.exchangeRate,
        notes: body.notes,
        allocations: [{ salesInvoiceId: invoice.id, allocatedAmount: body.amountReceived ?? invoice.amountDue }],
      }, context);
    },
    async update(tenantId: string, id: string, input: unknown, context: CustomerReceiptActionContext) {
      const current = assertFound(await repository.getCustomerReceiptById(tenantId, id), "Customer receipt");
      assertPermission(context, permissions.update, current);
      if (current.status !== "DRAFT") throw new Error("Only DRAFT receipts can be edited");
      const parsed = customerReceiptUpdateSchema.parse(input) as CustomerReceiptUpdateInput;
      const normalized = (await normalizeHeader(parsed, tenantId)) as CustomerReceiptUpdateInput;
      const customerId = normalized.customerId ?? current.customerId;
      const allocations = parsed.allocations ? await buildAllocations(tenantId, customerId, parsed.allocations) : undefined;
      if (allocations) assertAmountMatches(normalized.amountReceived ?? current.amountReceived, allocations);
      const updated = assertFound(await repository.updateCustomerReceipt(tenantId, id, normalized, allocations, context.actorId), "Customer receipt");
      createAuditEvent("updated", tenantId, id, context.actorId, { event: events.updated });
      return updated;
    },
    async softDelete(tenantId: string, id: string, context: CustomerReceiptActionContext) {
      const current = assertFound(await repository.getCustomerReceiptById(tenantId, id), "Customer receipt");
      assertPermission(context, permissions.delete, current);
      if (current.status !== "DRAFT") throw new Error("Only DRAFT receipts can be deleted");
      const deleted = assertFound(await repository.softDeleteCustomerReceipt(tenantId, id, context.actorId), "Customer receipt");
      createAuditEvent("deleted", tenantId, id, context.actorId, { event: events.deleted });
      return deleted;
    },
    async cancel(tenantId: string, id: string, context: CustomerReceiptActionContext) {
      const current = assertFound(await repository.getCustomerReceiptById(tenantId, id), "Customer receipt");
      assertPermission(context, permissions.cancel, current);
      if (current.status !== "DRAFT") throw new Error("Only DRAFT receipts can be cancelled");
      const cancelled = assertFound(await repository.cancelDraftCustomerReceipt(tenantId, id, context.actorId), "Customer receipt");
      createAuditEvent("cancelled", tenantId, id, context.actorId, { event: events.cancelled });
      return cancelled;
    },
    async post(tenantId: string, id: string, input: unknown, context: CustomerReceiptActionContext) {
      const parsed = postCustomerReceiptSchema.parse(input);
      const postWith = async (receiptRepository: CustomerReceiptRepository, invoiceRepository: SalesInvoiceRepository, accountingClient: typeof accountingService) => {
        const receipt = assertFound(await receiptRepository.getCustomerReceiptById(tenantId, id), "Customer receipt");
        assertPermission(context, permissions.post, receipt);
        if (receipt.status !== "DRAFT") throw new Error("Only DRAFT receipts can be posted");
        if (receipt.journalEntryId) throw new Error("Customer receipt is already posted");
        assertAmountMatches(receipt.amountReceived, receipt.allocations);
        for (const allocation of receipt.allocations) {
          const invoice = assertFound(await invoiceRepository.getSalesInvoiceById(tenantId, allocation.salesInvoiceId), "Sales invoice");
          validatePayableInvoice(invoice, receipt.customerId, allocation.allocatedAmount);
        }
        const receiptForPosting = parsed.postingDate ? { ...receipt, postingDate: parsed.postingDate } : receipt;
        const journal = await buildReceiptJournal(receiptForPosting, context, accountingClient);
        const postedJournal = await accountingClient.postJournalEntry(tenantId, journal.id, context);
        for (const allocation of receipt.allocations) {
          const updatedInvoice = assertFound(await invoiceRepository.applySalesInvoicePayment(tenantId, allocation.salesInvoiceId, allocation.allocatedAmount, context.actorId), "Sales invoice");
          createAuditEvent("invoicePaymentStatusUpdated", tenantId, updatedInvoice.id, context.actorId, { event: events.invoicePaymentStatusUpdated, paymentStatus: updatedInvoice.paymentStatus });
        }
        const posted = assertFound(await receiptRepository.postCustomerReceipt(tenantId, id, postedJournal.id, parsed.postingDate, context.actorId), "Customer receipt");
        createAuditEvent("posted", tenantId, id, context.actorId, { event: events.posted, journalEntryId: postedJournal.id });
        return { receipt: posted, journalEntry: postedJournal };
      };
      if (repository === customerReceiptsRepository && invoices === salesInvoicesRepository && accounting === accountingService) {
        return getTenantKnex().transaction(async (trx) =>
          postWith(createCustomerReceiptsRepository(trx), createSalesInvoicesRepository(trx), createAccountingService(createAccountingRepository(trx))),
        );
      }
      return postWith(repository, invoices, accounting);
    },
    async getAllocations(tenantId: string, id: string, context: CustomerReceiptActionContext) {
      const current = assertFound(await repository.getCustomerReceiptById(tenantId, id), "Customer receipt");
      assertPermission(context, permissions.view, current);
      return repository.getCustomerReceiptAllocations(tenantId, id);
    },
    async getByInvoice(tenantId: string, invoiceId: string, context: CustomerReceiptActionContext) {
      assertPermission(context, permissions.view);
      return repository.getCustomerReceiptsByInvoice(tenantId, invoiceId);
    },
    async getByCustomer(tenantId: string, customerId: string, context: CustomerReceiptActionContext) {
      assertPermission(context, permissions.view);
      return repository.getCustomerReceiptsByCustomer(tenantId, customerId);
    },
  };
}

export const customerReceiptsService = createCustomerReceiptsService();

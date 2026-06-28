import { getTenantKnex } from "@vercent/database/knex";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { createAccountingRepository } from "../accounting/repository";
import { accountingService, createAccountingService } from "../accounting/service";
import type { JournalEntryRecord } from "../accounting/types";
import { masterDataRepository } from "../../master-data/foundation/repository";
import type { MasterDataRepository } from "../../master-data/foundation/types";
import { createSalesCreditNotesRepository, salesCreditNotesRepository } from "../../sales/credit-notes/repository";
import type { SalesCreditNoteRecord, SalesCreditNoteRepository } from "../../sales/credit-notes/types";
import { createAuditEvent } from "./audit";
import { events } from "./events";
import { permissions } from "./permissions";
import { createCustomerRefundsRepository, customerRefundsRepository } from "./repository";
import { customerRefundCreateSchema, customerRefundListSchema, customerRefundUpdateSchema, postCustomerRefundSchema } from "./schemas";
import type {
  CustomerRefundActionContext,
  CustomerRefundAllocationInput,
  CustomerRefundAllocationRecord,
  CustomerRefundCreateInput,
  CustomerRefundRecord,
  CustomerRefundRepository,
  CustomerRefundUpdateInput,
} from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => { if (!decision.allowed) throw new Error(decision.reasons.join("; ")); };
const assertPermission = (context: CustomerRefundActionContext, permission: string, record?: unknown) => assertAllowed(evaluatePolicy({ actor: context, permission, record: record as never }));
const assertFound = <T>(record: T | undefined, label: string) => { if (!record) throw new Error(`${label} was not found`); return record; };
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function createCustomerRefundsService(
  repository: CustomerRefundRepository = customerRefundsRepository,
  masterData: MasterDataRepository = masterDataRepository,
  creditNotes: SalesCreditNoteRepository = salesCreditNotesRepository,
  accounting: typeof accountingService = accountingService,
) {
  async function normalizeHeader(input: CustomerRefundCreateInput | CustomerRefundUpdateInput, tenantId: string) {
    if (!input.customerId) return input;
    const customer = assertFound(await masterData.getCustomerById(tenantId, input.customerId), "Customer");
    if (customer.status !== "ACTIVE") throw new Error("Customer must be active");
    return { ...input, partyId: input.partyId ?? customer.partyId };
  }

  function validateRefundableCreditNote(note: SalesCreditNoteRecord, customerId: string, amount: number) {
    if (note.customerId !== customerId) throw new Error("Refund credit note must belong to the same customer");
    if (note.status !== "POSTED") throw new Error("Only POSTED credit notes can be refunded");
    if (note.deletedAt) throw new Error("Deleted credit notes cannot be refunded");
    if (amount <= 0) throw new Error("Refund allocation amount must be greater than zero");
    if (roundMoney(amount) > roundMoney(note.availableAmount)) throw new Error("Refund cannot exceed available credit note amount");
  }

  async function buildAllocations(tenantId: string, customerId: string, inputAllocations: CustomerRefundAllocationInput[], creditNoteRepository: SalesCreditNoteRepository = creditNotes) {
    const allocations: CustomerRefundAllocationRecord[] = [];
    for (const input of inputAllocations) {
      const creditNote = assertFound(await creditNoteRepository.getSalesCreditNoteById(tenantId, input.creditNoteId), "Sales credit note");
      validateRefundableCreditNote(creditNote, customerId, input.amount);
      allocations.push({
        id: crypto.randomUUID(),
        refundId: "",
        creditNoteId: creditNote.id,
        amount: roundMoney(input.amount),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    return allocations;
  }

  function assertAmountMatches(totalAmount: number, allocations: CustomerRefundAllocationRecord[]) {
    const allocated = roundMoney(allocations.reduce((sum, allocation) => sum + allocation.amount, 0));
    if (roundMoney(totalAmount) !== allocated) throw new Error("Refund amount must equal total allocated credit amount");
    return allocated;
  }

  async function assertDepositAccount(tenantId: string, accountId: string, context: CustomerRefundActionContext, accountingClient: typeof accountingService) {
    const account = await accountingClient.getAccountById(tenantId, accountId, context);
    if (!account.isActive) throw new Error("Refund account must be active");
    if (!account.isCashAccount && !account.isBankAccount) throw new Error("Refund account must be a cash or bank account");
    return account;
  }

  async function buildRefundJournal(refund: CustomerRefundRecord, context: CustomerRefundActionContext, accountingClient: typeof accountingService) {
    const settings = await accountingClient.getAccountingSettings(refund.tenantId, context, refund.companyId, refund.branchId);
    if (!settings) throw new Error("Accounting settings are required before posting refunds");
    const arAccount = await accountingClient.getAccountById(refund.tenantId, settings.accountsReceivableAccountId, context);
    if (!arAccount.isActive) throw new Error("Accounts receivable account must be active");
    await assertDepositAccount(refund.tenantId, refund.depositAccountId, context, accountingClient);
    const postingDate = refund.postingDate ?? refund.refundDate;
    const fiscalYear = await accountingClient.resolveOpenFiscalYearForDate(refund.tenantId, postingDate, context, refund.companyId);
    return accountingClient.createJournalEntry({
      tenantId: refund.tenantId,
      companyId: refund.companyId,
      branchId: refund.branchId,
      journalDate: refund.refundDate,
      postingDate,
      fiscalYearId: fiscalYear.id,
      referenceType: "CUSTOMER_REFUND",
      referenceId: refund.id,
      sourceModule: "FINANCE",
      narration: `Customer refund ${refund.refundNumber}`,
      lines: [
        { accountId: settings.accountsReceivableAccountId, customerId: refund.customerId, partyId: refund.partyId, debitAmount: refund.totalAmount, narration: `Customer refund ${refund.refundNumber}` },
        { accountId: refund.depositAccountId, creditAmount: refund.totalAmount, narration: `Customer refund ${refund.refundNumber}` },
      ],
    }, context) as Promise<JournalEntryRecord>;
  }

  return {
    async list(input: unknown, context: CustomerRefundActionContext) {
      const parsed = customerRefundListSchema.parse(input);
      assertPermission(context, permissions.view);
      return repository.listCustomerRefunds(parsed);
    },
    async stats(input: unknown, context: CustomerRefundActionContext) {
      const parsed = customerRefundListSchema.pick({ tenantId: true, companyId: true, branchId: true }).parse(input);
      assertPermission(context, permissions.view);
      return repository.getCustomerRefundStats(parsed.tenantId, parsed);
    },
    async getById(tenantId: string, id: string, context: CustomerRefundActionContext) {
      const refund = assertFound(await repository.getCustomerRefundById(tenantId, id), "Customer refund");
      assertPermission(context, permissions.view, refund);
      return refund;
    },
    async create(input: unknown, context: CustomerRefundActionContext) {
      const parsed = customerRefundCreateSchema.parse(input) as CustomerRefundCreateInput;
      assertPermission(context, permissions.create);
      const normalized = (await normalizeHeader(parsed, parsed.tenantId)) as CustomerRefundCreateInput;
      const allocations = await buildAllocations(parsed.tenantId, normalized.customerId, parsed.allocations);
      assertAmountMatches(parsed.totalAmount, allocations);
      const created = await repository.createCustomerRefund(normalized, allocations, context.actorId);
      createAuditEvent("created", created.tenantId, created.id, context.actorId, { event: events.created });
      return created;
    },
    async createFromCreditNote(tenantId: string, creditNoteId: string, input: unknown, context: CustomerRefundActionContext) {
      const creditNote = assertFound(await creditNotes.getSalesCreditNoteById(tenantId, creditNoteId), "Sales credit note");
      const body = input as Partial<CustomerRefundCreateInput>;
      return this.create({
        tenantId,
        companyId: creditNote.companyId,
        branchId: creditNote.branchId,
        customerId: creditNote.customerId,
        partyId: creditNote.partyId,
        refundDate: body.refundDate,
        postingDate: body.postingDate,
        paymentMethod: body.paymentMethod ?? "BANK_TRANSFER",
        depositAccountId: body.depositAccountId!,
        totalAmount: body.totalAmount ?? creditNote.availableAmount,
        referenceNumber: body.referenceNumber,
        notes: body.notes,
        allocations: [{ creditNoteId: creditNote.id, amount: body.totalAmount ?? creditNote.availableAmount }],
      }, context);
    },
    async update(tenantId: string, id: string, input: unknown, context: CustomerRefundActionContext) {
      const current = assertFound(await repository.getCustomerRefundById(tenantId, id), "Customer refund");
      assertPermission(context, permissions.update, current);
      if (current.status !== "DRAFT") throw new Error("Only DRAFT refunds can be edited");
      const parsed = customerRefundUpdateSchema.parse(input) as CustomerRefundUpdateInput;
      const normalized = (await normalizeHeader(parsed, tenantId)) as CustomerRefundUpdateInput;
      const customerId = normalized.customerId ?? current.customerId;
      const allocations = parsed.allocations ? await buildAllocations(tenantId, customerId, parsed.allocations) : undefined;
      if (allocations) assertAmountMatches(normalized.totalAmount ?? current.totalAmount, allocations);
      const updated = assertFound(await repository.updateCustomerRefund(tenantId, id, normalized, allocations, context.actorId), "Customer refund");
      createAuditEvent("updated", tenantId, id, context.actorId, { event: events.updated });
      return updated;
    },
    async softDelete(tenantId: string, id: string, context: CustomerRefundActionContext) {
      const current = assertFound(await repository.getCustomerRefundById(tenantId, id), "Customer refund");
      assertPermission(context, permissions.delete, current);
      if (current.status !== "DRAFT") throw new Error("Only DRAFT refunds can be deleted");
      const deleted = assertFound(await repository.softDeleteCustomerRefund(tenantId, id, context.actorId), "Customer refund");
      createAuditEvent("deleted", tenantId, id, context.actorId, { event: events.deleted });
      return deleted;
    },
    async cancel(tenantId: string, id: string, context: CustomerRefundActionContext) {
      const current = assertFound(await repository.getCustomerRefundById(tenantId, id), "Customer refund");
      assertPermission(context, permissions.cancel, current);
      if (current.status !== "DRAFT") throw new Error("Only DRAFT refunds can be cancelled");
      const cancelled = assertFound(await repository.cancelDraftCustomerRefund(tenantId, id, context.actorId), "Customer refund");
      createAuditEvent("cancelled", tenantId, id, context.actorId, { event: events.cancelled });
      return cancelled;
    },
    async post(tenantId: string, id: string, input: unknown, context: CustomerRefundActionContext) {
      const parsed = postCustomerRefundSchema.parse(input);
      const postWith = async (refundRepository: CustomerRefundRepository, creditNoteRepository: SalesCreditNoteRepository, accountingClient: typeof accountingService) => {
        const refund = assertFound(await refundRepository.getCustomerRefundById(tenantId, id), "Customer refund");
        assertPermission(context, permissions.post, refund);
        if (refund.status !== "DRAFT") throw new Error("Only DRAFT refunds can be posted");
        if (refund.journalEntryId) throw new Error("Customer refund is already posted");
        assertAmountMatches(refund.totalAmount, refund.allocations);
        for (const allocation of refund.allocations) {
          const creditNote = assertFound(await creditNoteRepository.getSalesCreditNoteById(tenantId, allocation.creditNoteId), "Sales credit note");
          validateRefundableCreditNote(creditNote, refund.customerId, allocation.amount);
        }
        const refundForPosting = parsed.postingDate ? { ...refund, postingDate: parsed.postingDate } : refund;
        const journal = await buildRefundJournal(refundForPosting, context, accountingClient);
        const postedJournal = await accountingClient.postJournalEntry(tenantId, journal.id, context);
        for (const allocation of refund.allocations) {
          assertFound(await creditNoteRepository.applyCreditNoteRefund(tenantId, allocation.creditNoteId, allocation.amount, context.actorId), "Sales credit note");
        }
        const posted = assertFound(await refundRepository.postCustomerRefund(tenantId, id, postedJournal.id, parsed.postingDate, context.actorId), "Customer refund");
        createAuditEvent("posted", tenantId, id, context.actorId, { event: events.posted, journalEntryId: postedJournal.id });
        return { refund: posted, journalEntry: postedJournal };
      };
      if (repository === customerRefundsRepository && creditNotes === salesCreditNotesRepository && accounting === accountingService) {
        return getTenantKnex().transaction(async (trx) =>
          postWith(createCustomerRefundsRepository(trx), createSalesCreditNotesRepository(trx), createAccountingService(createAccountingRepository(trx))),
        );
      }
      return postWith(repository, creditNotes, accounting);
    },
    async getAllocations(tenantId: string, id: string, context: CustomerRefundActionContext) {
      const refund = assertFound(await repository.getCustomerRefundById(tenantId, id), "Customer refund");
      assertPermission(context, permissions.view, refund);
      return repository.getCustomerRefundAllocations(tenantId, id);
    },
    async getByCreditNote(tenantId: string, creditNoteId: string, context: CustomerRefundActionContext) {
      assertPermission(context, permissions.view);
      return repository.getCustomerRefundsByCreditNote(tenantId, creditNoteId);
    },
  };
}

export const customerRefundsService = createCustomerRefundsService();

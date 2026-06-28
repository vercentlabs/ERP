import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { getTenantKnex } from "@vercent/database/knex";
import { createAccountingRepository } from "../../finance/accounting/repository";
import { accountingService, createAccountingService } from "../../finance/accounting/service";
import type { JournalEntryRecord } from "../../finance/accounting/types";
import { masterDataRepository } from "../../master-data/foundation/repository";
import type { MasterDataRepository } from "../../master-data/foundation/types";
import { deliveryNotesRepository } from "../delivery-notes/repository";
import type { DeliveryNoteRecord, DeliveryNoteRepository } from "../delivery-notes/types";
import { salesOrdersRepository } from "../sales-orders/repository";
import type { SalesOrderRecord, SalesOrderRepository } from "../sales-orders/types";
import { createAuditEvent } from "./audit";
import { events } from "./events";
import { permissions } from "./permissions";
import { calculateSalesInvoiceLine, createSalesInvoicesRepository, salesInvoicesRepository } from "./repository";
import {
  createSalesInvoiceFromDeliveryNoteSchema,
  createSalesInvoiceFromSalesOrderSchema,
  issueSalesInvoiceSchema,
  salesInvoiceCreateSchema,
  salesInvoiceListSchema,
  salesInvoiceUpdateSchema,
} from "./schemas";
import type {
  CreateSalesInvoiceFromDeliveryNoteInput,
  CreateSalesInvoiceFromSalesOrderInput,
  SalesInvoiceActionContext,
  SalesInvoiceCreateInput,
  SalesInvoiceLineInput,
  SalesInvoiceLineRecord,
  SalesInvoiceListRequest,
  SalesInvoiceRecord,
  SalesInvoiceRepository,
  SalesInvoiceUpdateInput,
} from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};
const assertPermission = (context: SalesInvoiceActionContext, permission: string, record?: unknown) => assertAllowed(evaluatePolicy({ actor: context, permission, record: record as never }));
const assertFound = <T>(record: T | undefined, label: string) => {
  if (!record) throw new Error(`${label} was not found`);
  return record;
};
const assertDraft = (invoice: SalesInvoiceRecord) => {
  if (invoice.status !== "DRAFT") throw new Error("Only DRAFT invoices can be edited, issued, cancelled, or deleted");
};

export function createSalesInvoicesService(
  repository: SalesInvoiceRepository = salesInvoicesRepository,
  masterData: MasterDataRepository = masterDataRepository,
  salesOrders: SalesOrderRepository = salesOrdersRepository,
  deliveryNotes: DeliveryNoteRepository = deliveryNotesRepository,
  accounting: typeof accountingService = accountingService,
) {
  async function normalizeHeader(input: SalesInvoiceCreateInput | SalesInvoiceUpdateInput, tenantId: string) {
    if (!input.customerId) return input;
    const customer = assertFound(await masterData.getCustomerById(tenantId, input.customerId), "Customer");
    return { ...input, partyId: input.partyId ?? customer.partyId, currency: input.currency ?? customer.currency ?? "INR" };
  }

  async function buildManualLines(tenantId: string, inputLines: SalesInvoiceLineInput[]) {
    const lines: SalesInvoiceLineRecord[] = [];
    for (const [index, input] of inputLines.entries()) {
      const item = assertFound(await masterData.getItemById(tenantId, input.itemId), "Item");
      assertFound(await masterData.getUomById(tenantId, input.uomId), "UOM");
      lines.push(
        calculateSalesInvoiceLine({
          id: crypto.randomUUID(),
          invoiceId: "",
          salesOrderLineId: input.salesOrderLineId,
          deliveryNoteLineId: input.deliveryNoteLineId,
          lineNumber: index + 1,
          itemId: input.itemId,
          itemName: input.itemName ?? item.name,
          description: input.description ?? item.description,
          quantity: input.quantity,
          uomId: input.uomId,
          unitPrice: input.unitPrice,
          discountPercent: input.discountPercent ?? 0,
          taxRate: input.taxRate ?? 0,
          hsnSacCode: input.hsnSacCode ?? item.hsnSacCode,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      );
    }
    return lines;
  }

  async function buildLinesFromOrder(order: SalesOrderRecord) {
    const lines: SalesInvoiceLineRecord[] = [];
    for (const [index, line] of order.lines.entries()) {
      const item = assertFound(await masterData.getItemById(order.tenantId, line.itemId), "Item");
      if (item.isStockItem) throw new Error("Direct sales order invoicing is only allowed for non-stock/service items in this prompt");
      lines.push(
        calculateSalesInvoiceLine({
          id: crypto.randomUUID(),
          invoiceId: "",
          salesOrderLineId: line.id,
          lineNumber: index + 1,
          itemId: line.itemId,
          itemName: line.itemName,
          description: line.description,
          quantity: line.quantity,
          uomId: line.uomId,
          unitPrice: line.unitPrice,
          discountPercent: line.discountPercent,
          taxRate: line.taxRate,
          hsnSacCode: item.hsnSacCode,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      );
    }
    return lines;
  }

  async function buildLinesFromDeliveryNote(note: DeliveryNoteRecord, order: SalesOrderRecord) {
    return Promise.all(
      note.lines.map(async (line, index) => {
        const orderLine = assertFound(order.lines.find((candidate) => candidate.id === line.salesOrderLineId), "Sales order line");
        const item = assertFound(await masterData.getItemById(note.tenantId, line.itemId), "Item");
        return calculateSalesInvoiceLine({
          id: crypto.randomUUID(),
          invoiceId: "",
          salesOrderLineId: line.salesOrderLineId,
          deliveryNoteLineId: line.id,
          lineNumber: index + 1,
          itemId: line.itemId,
          itemName: line.itemName,
          description: line.description,
          quantity: line.quantity,
          uomId: line.uomId,
          unitPrice: orderLine.unitPrice,
          discountPercent: orderLine.discountPercent,
          taxRate: orderLine.taxRate,
          hsnSacCode: item.hsnSacCode,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }),
    );
  }

  async function assertActiveMappedAccount(tenantId: string, accountId: string, label: string, context: SalesInvoiceActionContext, accountingClient: typeof accountingService) {
    const account = await accountingClient.getAccountById(tenantId, accountId, context);
    if (!account.isActive) throw new Error(`${label} must be an active account`);
    return account;
  }

  function buildInvoiceJournalLines(invoice: SalesInvoiceRecord, settings: NonNullable<Awaited<ReturnType<typeof accounting.getAccountingSettings>>>) {
    const debitTotal = invoice.roundedTotalAmount ?? invoice.totalAmount;
    const creditBase = invoice.taxableAmount;
    const lines = [
      { accountId: settings.accountsReceivableAccountId, debitAmount: debitTotal, narration: `Sales invoice ${invoice.invoiceNumber}` },
      { accountId: settings.salesIncomeAccountId, creditAmount: creditBase, narration: `Sales revenue ${invoice.invoiceNumber}` },
    ];
    if (invoice.taxAmount > 0) {
      if (!settings.salesTaxPayableAccountId) throw new Error("Sales tax payable account is required when invoice has tax");
      lines.push({ accountId: settings.salesTaxPayableAccountId, creditAmount: invoice.taxAmount, narration: `Sales tax ${invoice.invoiceNumber}` });
    }
    const creditTotal = creditBase + invoice.taxAmount;
    const difference = Math.round((debitTotal - creditTotal + Number.EPSILON) * 100) / 100;
    if (difference !== 0) {
      if (!settings.roundingAdjustmentAccountId) throw new Error("Rounding adjustment account is required when rounded total differs from total amount");
      lines.push(difference > 0 ? { accountId: settings.roundingAdjustmentAccountId, creditAmount: difference, narration: `Rounding ${invoice.invoiceNumber}` } : { accountId: settings.roundingAdjustmentAccountId, debitAmount: Math.abs(difference), narration: `Rounding ${invoice.invoiceNumber}` });
    }
    return lines;
  }

  return {
    async list(input: unknown, context?: SalesInvoiceActionContext) {
      const parsed = salesInvoiceListSchema.parse(input) as SalesInvoiceListRequest;
      if (context) assertPermission(context, permissions.view);
      return repository.listSalesInvoices(parsed);
    },
    async stats(input: unknown, context: SalesInvoiceActionContext) {
      const parsed = salesInvoiceListSchema.pick({ tenantId: true, companyId: true, branchId: true }).parse(input);
      assertPermission(context, permissions.view);
      return repository.getSalesInvoiceStats(parsed.tenantId, parsed);
    },
    async getById(tenantId: string, id: string, context: SalesInvoiceActionContext) {
      const invoice = assertFound(await repository.getSalesInvoiceById(tenantId, id), "Sales invoice");
      assertPermission(context, permissions.view, invoice);
      return invoice;
    },
    async create(input: unknown, context: SalesInvoiceActionContext) {
      const parsed = salesInvoiceCreateSchema.parse(input) as SalesInvoiceCreateInput;
      assertPermission(context, permissions.create);
      if (parsed.deliveryNoteId) return this.createFromDeliveryNote(parsed.tenantId, parsed.deliveryNoteId, parsed, context);
      if (parsed.salesOrderId) return this.createFromSalesOrder(parsed.tenantId, parsed.salesOrderId, parsed, context);
      const normalized = (await normalizeHeader(parsed, parsed.tenantId)) as SalesInvoiceCreateInput;
      const lines = await buildManualLines(parsed.tenantId, parsed.lines);
      const totals = repository.calculateSalesInvoiceTotals(lines);
      const created = await repository.createSalesInvoice(normalized, lines, totals, context.actorId);
      createAuditEvent("created", created.tenantId, created.id, context.actorId, { event: events.created });
      return created;
    },
    async createFromDeliveryNote(tenantId: string, deliveryNoteId: string, input: unknown, context: SalesInvoiceActionContext) {
      const parsed = createSalesInvoiceFromDeliveryNoteSchema.parse({ tenantId, ...(input as object) }) as CreateSalesInvoiceFromDeliveryNoteInput;
      assertPermission(context, permissions.create);
      const note = assertFound(await deliveryNotes.getDeliveryNoteById(tenantId, deliveryNoteId), "Delivery note");
      if (note.status !== "POSTED") throw new Error("Only POSTED delivery notes can be invoiced");
      if (await repository.getSalesInvoiceByDeliveryNote(tenantId, deliveryNoteId)) throw new Error("Delivery note already has an invoice");
      const order = assertFound(await salesOrders.getSalesOrderById(tenantId, note.salesOrderId), "Sales order");
      const lines = await buildLinesFromDeliveryNote(note, order);
      const totals = repository.calculateSalesInvoiceTotals(lines);
      const created = await repository.createSalesInvoiceFromDeliveryNote({ tenantId, companyId: note.companyId, branchId: note.branchId, customerId: note.customerId, partyId: note.partyId, salesOrderId: note.salesOrderId, deliveryNoteId, opportunityId: order.opportunityId, quotationId: order.quotationId, invoiceDate: parsed.invoiceDate, dueDate: parsed.dueDate, currency: order.currency, exchangeRate: order.exchangeRate, billingAddressId: order.billingAddressId, shippingAddressId: note.shippingAddressId ?? order.shippingAddressId, terms: parsed.terms ?? order.terms, notes: parsed.notes, lines: [] }, lines, totals, context.actorId);
      createAuditEvent("createdFromDeliveryNote", created.tenantId, created.id, context.actorId, { event: events.createdFromDeliveryNote, deliveryNoteId });
      return created;
    },
    async createFromSalesOrder(tenantId: string, salesOrderId: string, input: unknown, context: SalesInvoiceActionContext) {
      const parsed = createSalesInvoiceFromSalesOrderSchema.parse({ tenantId, ...(input as object) }) as CreateSalesInvoiceFromSalesOrderInput;
      assertPermission(context, permissions.create);
      const order = assertFound(await salesOrders.getSalesOrderById(tenantId, salesOrderId), "Sales order");
      if (order.status === "CANCELLED" || order.status === "DRAFT") throw new Error("Sales order must be CONFIRMED or CLOSED to invoice");
      if ((await repository.getSalesInvoicesBySalesOrder(tenantId, salesOrderId)).some((invoice) => !invoice.deliveryNoteId)) throw new Error("Sales order already has a direct invoice");
      const lines = await buildLinesFromOrder(order);
      const totals = repository.calculateSalesInvoiceTotals(lines);
      const created = await repository.createSalesInvoiceFromSalesOrder({ tenantId, companyId: order.companyId, branchId: order.branchId, customerId: order.customerId, partyId: order.partyId, salesOrderId, opportunityId: order.opportunityId, quotationId: order.quotationId, invoiceDate: parsed.invoiceDate, dueDate: parsed.dueDate, currency: order.currency, exchangeRate: order.exchangeRate, billingAddressId: order.billingAddressId, shippingAddressId: order.shippingAddressId, terms: parsed.terms ?? order.terms, notes: parsed.notes, lines: [] }, lines, totals, context.actorId);
      createAuditEvent("createdFromSalesOrder", created.tenantId, created.id, context.actorId, { event: events.createdFromSalesOrder, salesOrderId });
      return created;
    },
    async update(tenantId: string, id: string, input: unknown, context: SalesInvoiceActionContext) {
      const current = assertFound(await repository.getSalesInvoiceById(tenantId, id), "Sales invoice");
      assertPermission(context, permissions.update, current);
      assertDraft(current);
      const parsed = salesInvoiceUpdateSchema.parse(input) as SalesInvoiceUpdateInput;
      const normalized = (await normalizeHeader(parsed, tenantId)) as SalesInvoiceUpdateInput;
      const lines = parsed.lines ? await buildManualLines(tenantId, parsed.lines) : undefined;
      const totals = lines ? repository.calculateSalesInvoiceTotals(lines) : undefined;
      const updated = assertFound(await repository.updateSalesInvoice(tenantId, id, normalized, lines, totals, context.actorId), "Sales invoice");
      createAuditEvent("updated", tenantId, id, context.actorId, { event: events.updated });
      return updated;
    },
    async softDelete(tenantId: string, id: string, context: SalesInvoiceActionContext) {
      const current = assertFound(await repository.getSalesInvoiceById(tenantId, id), "Sales invoice");
      assertPermission(context, permissions.delete, current);
      assertDraft(current);
      const deleted = assertFound(await repository.softDeleteSalesInvoice(tenantId, id, context.actorId), "Sales invoice");
      createAuditEvent("deleted", tenantId, id, context.actorId, { event: events.deleted });
      return deleted;
    },
    async issue(tenantId: string, id: string, input: unknown, context: SalesInvoiceActionContext) {
      const current = assertFound(await repository.getSalesInvoiceById(tenantId, id), "Sales invoice");
      assertPermission(context, permissions.issue, current);
      assertDraft(current);
      const issued = assertFound(await repository.issueSalesInvoice(tenantId, id, issueSalesInvoiceSchema.parse(input), context.actorId), "Sales invoice");
      createAuditEvent("issued", tenantId, id, context.actorId, { event: events.issued });
      return issued;
    },
    async cancel(tenantId: string, id: string, context: SalesInvoiceActionContext) {
      const current = assertFound(await repository.getSalesInvoiceById(tenantId, id), "Sales invoice");
      assertPermission(context, permissions.cancel, current);
      assertDraft(current);
      const cancelled = assertFound(await repository.cancelDraftSalesInvoice(tenantId, id, context.actorId), "Sales invoice");
      createAuditEvent("cancelled", tenantId, id, context.actorId, { event: events.cancelled });
      return cancelled;
    },
    async getLines(tenantId: string, id: string, context: SalesInvoiceActionContext) {
      const current = assertFound(await repository.getSalesInvoiceById(tenantId, id), "Sales invoice");
      assertPermission(context, permissions.view, current);
      return repository.getSalesInvoiceLines(tenantId, id);
    },
    async getBySalesOrder(tenantId: string, salesOrderId: string, context: SalesInvoiceActionContext) {
      assertPermission(context, permissions.view);
      return repository.getSalesInvoicesBySalesOrder(tenantId, salesOrderId);
    },
    async getByDeliveryNote(tenantId: string, deliveryNoteId: string, context: SalesInvoiceActionContext) {
      assertPermission(context, permissions.view);
      return repository.getSalesInvoiceByDeliveryNote(tenantId, deliveryNoteId);
    },
    async postToAccounting(tenantId: string, id: string, input: unknown, context: SalesInvoiceActionContext) {
      const postWith = async (invoiceRepository: SalesInvoiceRepository, accountingClient: typeof accountingService) => {
      const invoice = assertFound(await invoiceRepository.getSalesInvoiceById(tenantId, id), "Sales invoice");
      assertPermission(context, permissions.postAccounting, invoice);
      if (invoice.status !== "ISSUED") throw new Error("Only ISSUED sales invoices can be posted to accounting");
      if (invoice.deletedAt) throw new Error("Deleted sales invoices cannot be posted to accounting");
      if (invoice.accountingStatus === "POSTED" || invoice.journalEntryId) throw new Error("Sales invoice is already posted to accounting");
      const settings = await accountingClient.getAccountingSettings(tenantId, context, invoice.companyId, invoice.branchId);
      if (!settings) throw new Error("Accounting settings are required before posting invoices");
      await assertActiveMappedAccount(tenantId, settings.accountsReceivableAccountId, "Accounts receivable account", context, accountingClient);
      await assertActiveMappedAccount(tenantId, settings.salesIncomeAccountId, "Sales income account", context, accountingClient);
      if (settings.salesTaxPayableAccountId) await assertActiveMappedAccount(tenantId, settings.salesTaxPayableAccountId, "Sales tax payable account", context, accountingClient);
      if (settings.roundingAdjustmentAccountId) await assertActiveMappedAccount(tenantId, settings.roundingAdjustmentAccountId, "Rounding adjustment account", context, accountingClient);
      const postingDate = (input as { postingDate?: string } | undefined)?.postingDate ?? invoice.invoiceDate;
      const fiscalYear = await accountingClient.resolveOpenFiscalYearForDate(tenantId, postingDate, context, invoice.companyId);
      const journal = await accountingClient.createJournalEntry({
        tenantId,
        companyId: invoice.companyId,
        branchId: invoice.branchId,
        journalDate: invoice.invoiceDate,
        postingDate,
        fiscalYearId: fiscalYear.id,
        referenceType: "SALES_INVOICE",
        referenceId: invoice.id,
        sourceModule: "SALES",
        narration: `Sales invoice ${invoice.invoiceNumber}`,
        lines: buildInvoiceJournalLines(invoice, settings),
      }, context) as JournalEntryRecord;
      const postedJournal = await accountingClient.postJournalEntry(tenantId, journal.id, context);
      const postedInvoice = assertFound(await invoiceRepository.postSalesInvoiceToAccounting(tenantId, id, postedJournal.id, context.actorId), "Sales invoice");
      createAuditEvent("accountingPosted", tenantId, id, context.actorId, { event: events.accountingPosted, journalEntryId: postedJournal.id });
      return { invoice: postedInvoice, journalEntry: postedJournal };
      };
      if (repository === salesInvoicesRepository && accounting === accountingService) {
        return getTenantKnex().transaction(async (trx) =>
          postWith(createSalesInvoicesRepository(trx), createAccountingService(createAccountingRepository(trx))),
        );
      }
      return postWith(repository, accounting);
    },
    async getAccountingStatus(tenantId: string, id: string, context: SalesInvoiceActionContext) {
      const invoice = assertFound(await repository.getSalesInvoiceAccountingStatus(tenantId, id), "Sales invoice");
      assertPermission(context, permissions.viewAccounting, invoice);
      return invoice;
    },
    async getJournalEntry(tenantId: string, id: string, context: SalesInvoiceActionContext) {
      const invoice = assertFound(await repository.getSalesInvoiceById(tenantId, id), "Sales invoice");
      assertPermission(context, permissions.viewAccounting, invoice);
      if (!invoice.journalEntryId) return null;
      return accounting.getJournalEntryById(tenantId, invoice.journalEntryId, context);
    },
  };
}

export const salesInvoicesService = createSalesInvoicesService();
export const invoicesService = salesInvoicesService;

import { getTenantKnex } from "@vercent/database/knex";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { createAccountingRepository } from "../../finance/accounting/repository";
import { accountingService, createAccountingService } from "../../finance/accounting/service";
import type { JournalEntryRecord } from "../../finance/accounting/types";
import { createInventoryStockRepository, inventoryStockRepository } from "../../inventory/stock-ledger/repository";
import type { InventoryStockRepository } from "../../inventory/stock-ledger/types";
import { masterDataRepository } from "../../master-data/foundation/repository";
import type { MasterDataRepository } from "../../master-data/foundation/types";
import { createSalesInvoicesRepository, salesInvoicesRepository } from "../invoices/repository";
import type { SalesInvoiceRecord, SalesInvoiceRepository } from "../invoices/types";
import { createAuditEvent } from "./audit";
import { events } from "./events";
import { permissions } from "./permissions";
import { calculateSalesCreditNoteLine, createSalesCreditNotesRepository, salesCreditNotesRepository } from "./repository";
import { createSalesCreditNoteFromInvoiceSchema, postSalesCreditNoteSchema, salesCreditNoteCreateSchema, salesCreditNoteListSchema, salesCreditNoteUpdateSchema } from "./schemas";
import type {
  SalesCreditNoteActionContext,
  SalesCreditNoteCreateInput,
  SalesCreditNoteLineInput,
  SalesCreditNoteLineRecord,
  SalesCreditNoteRecord,
  SalesCreditNoteRepository,
  SalesCreditNoteUpdateInput,
} from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => { if (!decision.allowed) throw new Error(decision.reasons.join("; ")); };
const assertPermission = (context: SalesCreditNoteActionContext, permission: string, record?: unknown) => assertAllowed(evaluatePolicy({ actor: context, permission, record: record as never }));
const assertFound = <T>(record: T | undefined, label: string) => { if (!record) throw new Error(`${label} was not found`); return record; };
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function createSalesCreditNotesService(
  repository: SalesCreditNoteRepository = salesCreditNotesRepository,
  invoices: SalesInvoiceRepository = salesInvoicesRepository,
  masterData: MasterDataRepository = masterDataRepository,
  accounting: typeof accountingService = accountingService,
  inventory: InventoryStockRepository = inventoryStockRepository,
) {
  function assertCreditEligibleInvoice(invoice: SalesInvoiceRecord) {
    if (invoice.status !== "ISSUED") throw new Error("Only ISSUED sales invoices can be credited");
    if (invoice.accountingStatus !== "POSTED") throw new Error("Sales invoice must be posted to accounting before credit note");
    if (invoice.deletedAt) throw new Error("Deleted sales invoices cannot be credited");
    if (invoice.amountDue <= 0) throw new Error("Fully paid or settled invoices cannot be credited in this prompt");
  }

  async function buildLines(tenantId: string, invoice: SalesInvoiceRecord, inputLines: SalesCreditNoteLineInput[]) {
    const lines: SalesCreditNoteLineRecord[] = [];
    for (const [index, input] of inputLines.entries()) {
      const invoiceLine = input.salesInvoiceLineId ? invoice.lines.find((line) => line.id === input.salesInvoiceLineId) : undefined;
      if (input.salesInvoiceLineId && !invoiceLine) throw new Error("Credit note line must reference a line from the selected invoice");
      const itemId = input.itemId ?? invoiceLine?.itemId;
      const uomId = input.uomId ?? invoiceLine?.uomId;
      const item = assertFound(await masterData.getItemById(tenantId, itemId), "Item");
      assertFound(await masterData.getUomById(tenantId, uomId), "UOM");
      if (invoiceLine && input.quantity > invoiceLine.quantity) throw new Error("Credit quantity cannot exceed invoiced quantity for a line");
      lines.push(calculateSalesCreditNoteLine({
        id: crypto.randomUUID(),
        creditNoteId: "",
        salesInvoiceLineId: input.salesInvoiceLineId,
        lineNumber: index + 1,
        itemId,
        itemName: input.itemName ?? invoiceLine?.itemName ?? item.name,
        description: input.description ?? invoiceLine?.description ?? item.description,
        quantity: input.quantity,
        uomId,
        unitPrice: input.unitPrice,
        discountPercent: input.discountPercent ?? 0,
        taxRate: input.taxRate ?? 0,
        hsnSacCode: input.hsnSacCode ?? invoiceLine?.hsnSacCode ?? item.hsnSacCode,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    }
    return lines;
  }

  async function buildLinesFromInvoice(invoice: SalesInvoiceRecord) {
    return invoice.lines.map((line, index) => calculateSalesCreditNoteLine({
      id: crypto.randomUUID(),
      creditNoteId: "",
      salesInvoiceLineId: line.id,
      lineNumber: index + 1,
      itemId: line.itemId,
      itemName: line.itemName,
      description: line.description,
      quantity: line.quantity,
      uomId: line.uomId,
      unitPrice: line.unitPrice,
      discountPercent: line.discountPercent,
      taxRate: line.taxRate,
      hsnSacCode: line.hsnSacCode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  }

  async function assertReturnStock(note: SalesCreditNoteRecord) {
    if (!note.returnToStock) return;
    if (!note.warehouseId) throw new Error("Warehouse is required when returning credit note lines to stock");
    for (const line of note.lines) {
      const item = assertFound(await masterData.getItemById(note.tenantId, line.itemId), "Item");
      if (!item.isStockItem) throw new Error("Only stock items can be returned to stock");
    }
  }

  async function buildJournal(note: SalesCreditNoteRecord, context: SalesCreditNoteActionContext, accountingClient: typeof accountingService) {
    const settings = await accountingClient.getAccountingSettings(note.tenantId, context, note.companyId, note.branchId);
    if (!settings) throw new Error("Accounting settings are required before posting credit notes");
    if (!settings.salesReturnsAccountId) throw new Error("Sales returns account is required before posting credit notes");
    const returnsAccount = await accountingClient.getAccountById(note.tenantId, settings.salesReturnsAccountId, context);
    if (!returnsAccount.isActive) throw new Error("Sales returns account must be active");
    const arAccount = await accountingClient.getAccountById(note.tenantId, settings.accountsReceivableAccountId, context);
    if (!arAccount.isActive) throw new Error("Accounts receivable account must be active");
    if (note.taxAmount > 0) {
      if (!settings.salesTaxPayableAccountId) throw new Error("Sales tax payable account is required when credit note reverses tax");
      const taxAccount = await accountingClient.getAccountById(note.tenantId, settings.salesTaxPayableAccountId, context);
      if (!taxAccount.isActive) throw new Error("Sales tax payable account must be active");
    }
    const postingDate = note.postingDate ?? note.creditNoteDate;
    const fiscalYear = await accountingClient.resolveOpenFiscalYearForDate(note.tenantId, postingDate, context, note.companyId);
    const debitLines = [{ accountId: settings.salesReturnsAccountId, debitAmount: note.taxableAmount, narration: `Sales credit note ${note.creditNoteNumber}` }];
    if (note.taxAmount > 0) debitLines.push({ accountId: settings.salesTaxPayableAccountId!, debitAmount: note.taxAmount, narration: `Tax reversal ${note.creditNoteNumber}` });
    return accountingClient.createJournalEntry({
      tenantId: note.tenantId,
      companyId: note.companyId,
      branchId: note.branchId,
      journalDate: note.creditNoteDate,
      postingDate,
      fiscalYearId: fiscalYear.id,
      referenceType: "SALES_CREDIT_NOTE",
      referenceId: note.id,
      sourceModule: "SALES",
      narration: `Sales credit note ${note.creditNoteNumber}`,
      lines: [...debitLines, { accountId: settings.accountsReceivableAccountId, customerId: note.customerId, partyId: note.partyId, creditAmount: note.totalAmount, narration: `Reduce receivable ${note.creditNoteNumber}` }],
    }, context) as Promise<JournalEntryRecord>;
  }

  return {
    async list(input: unknown, context?: SalesCreditNoteActionContext) {
      const parsed = salesCreditNoteListSchema.parse(input);
      if (context) assertPermission(context, permissions.view);
      return repository.listSalesCreditNotes(parsed);
    },
    async stats(input: unknown, context: SalesCreditNoteActionContext) {
      const parsed = salesCreditNoteListSchema.pick({ tenantId: true, companyId: true, branchId: true }).parse(input);
      assertPermission(context, permissions.view);
      return repository.getSalesCreditNoteStats(parsed.tenantId, parsed);
    },
    async getById(tenantId: string, id: string, context: SalesCreditNoteActionContext) {
      const note = assertFound(await repository.getSalesCreditNoteById(tenantId, id), "Sales credit note");
      assertPermission(context, permissions.view, note);
      return note;
    },
    async create(input: unknown, context: SalesCreditNoteActionContext) {
      const parsed = salesCreditNoteCreateSchema.parse(input) as SalesCreditNoteCreateInput;
      assertPermission(context, permissions.create);
      const invoice = assertFound(await invoices.getSalesInvoiceById(parsed.tenantId, parsed.salesInvoiceId), "Sales invoice");
      assertCreditEligibleInvoice(invoice);
      const lines = await buildLines(parsed.tenantId, invoice, parsed.lines);
      const totals = repository.calculateSalesCreditNoteTotals(lines);
      if (roundMoney(totals.totalAmount) > roundMoney(invoice.amountDue)) throw new Error("Credit note total cannot exceed invoice amount due");
      const note = await repository.createSalesCreditNote({ ...parsed, companyId: parsed.companyId ?? invoice.companyId, branchId: parsed.branchId ?? invoice.branchId, customerId: invoice.customerId, partyId: invoice.partyId, currency: invoice.currency, exchangeRate: invoice.exchangeRate }, lines, totals, context.actorId);
      createAuditEvent("created", note.tenantId, note.id, context.actorId, { event: events.created });
      return note;
    },
    async createFromInvoice(tenantId: string, invoiceId: string, input: unknown, context: SalesCreditNoteActionContext) {
      const parsed = createSalesCreditNoteFromInvoiceSchema.parse({ tenantId, ...(input as object) });
      assertPermission(context, permissions.create);
      const invoice = assertFound(await invoices.getSalesInvoiceById(tenantId, invoiceId), "Sales invoice");
      assertCreditEligibleInvoice(invoice);
      const lines = parsed.lines ? await buildLines(tenantId, invoice, parsed.lines) : await buildLinesFromInvoice(invoice);
      const totals = repository.calculateSalesCreditNoteTotals(lines);
      if (roundMoney(totals.totalAmount) > roundMoney(invoice.amountDue)) throw new Error("Credit note total cannot exceed invoice amount due");
      const note = await repository.createSalesCreditNote({ ...parsed, salesInvoiceId: invoiceId, lines: parsed.lines ?? [], companyId: invoice.companyId, branchId: invoice.branchId, customerId: invoice.customerId, partyId: invoice.partyId, currency: invoice.currency, exchangeRate: invoice.exchangeRate }, lines, totals, context.actorId);
      createAuditEvent("createdFromInvoice", note.tenantId, note.id, context.actorId, { event: events.createdFromInvoice, invoiceId });
      return note;
    },
    async update(tenantId: string, id: string, input: unknown, context: SalesCreditNoteActionContext) {
      const current = assertFound(await repository.getSalesCreditNoteById(tenantId, id), "Sales credit note");
      assertPermission(context, permissions.update, current);
      if (current.status !== "DRAFT") throw new Error("Only DRAFT credit notes can be edited");
      const parsed = salesCreditNoteUpdateSchema.parse(input) as SalesCreditNoteUpdateInput;
      const invoice = assertFound(await invoices.getSalesInvoiceById(tenantId, current.salesInvoiceId), "Sales invoice");
      const lines = parsed.lines ? await buildLines(tenantId, invoice, parsed.lines) : undefined;
      const totals = lines ? repository.calculateSalesCreditNoteTotals(lines) : undefined;
      if (totals && roundMoney(totals.totalAmount) > roundMoney(invoice.amountDue)) throw new Error("Credit note total cannot exceed invoice amount due");
      const updated = assertFound(await repository.updateSalesCreditNote(tenantId, id, parsed, lines, totals, context.actorId), "Sales credit note");
      createAuditEvent("updated", tenantId, id, context.actorId, { event: events.updated });
      return updated;
    },
    async softDelete(tenantId: string, id: string, context: SalesCreditNoteActionContext) {
      const current = assertFound(await repository.getSalesCreditNoteById(tenantId, id), "Sales credit note");
      assertPermission(context, permissions.delete, current);
      if (current.status !== "DRAFT") throw new Error("Only DRAFT credit notes can be deleted");
      return assertFound(await repository.softDeleteSalesCreditNote(tenantId, id, context.actorId), "Sales credit note");
    },
    async cancel(tenantId: string, id: string, context: SalesCreditNoteActionContext) {
      const current = assertFound(await repository.getSalesCreditNoteById(tenantId, id), "Sales credit note");
      assertPermission(context, permissions.cancel, current);
      if (current.status !== "DRAFT") throw new Error("Only DRAFT credit notes can be cancelled");
      return assertFound(await repository.cancelDraftSalesCreditNote(tenantId, id, context.actorId), "Sales credit note");
    },
    async post(tenantId: string, id: string, input: unknown, context: SalesCreditNoteActionContext) {
      const parsed = postSalesCreditNoteSchema.parse(input);
      const postWith = async (noteRepository: SalesCreditNoteRepository, invoiceRepository: SalesInvoiceRepository, accountingClient: typeof accountingService, inventoryRepository: InventoryStockRepository) => {
        const note = assertFound(await noteRepository.getSalesCreditNoteById(tenantId, id), "Sales credit note");
        assertPermission(context, permissions.post, note);
        if (note.status !== "DRAFT") throw new Error("Only DRAFT credit notes can be posted");
        if (note.journalEntryId) throw new Error("Sales credit note is already posted");
        const invoice = assertFound(await invoiceRepository.getSalesInvoiceById(tenantId, note.salesInvoiceId), "Sales invoice");
        assertCreditEligibleInvoice(invoice);
        if (roundMoney(note.totalAmount) > roundMoney(invoice.amountDue)) throw new Error("Credit note total cannot exceed invoice amount due");
        await assertReturnStock(note);
        const noteForPosting = parsed.postingDate ? { ...note, postingDate: parsed.postingDate } : note;
        const journal = await buildJournal(noteForPosting, context, accountingClient);
        const postedJournal = await accountingClient.postJournalEntry(tenantId, journal.id, context);
        if (note.returnToStock) {
          for (const line of note.lines) {
            await inventoryRepository.createStockLedgerEntry({ tenantId, companyId: note.companyId, branchId: note.branchId, itemId: line.itemId, warehouseId: note.warehouseId!, quantity: line.quantity, uomId: line.uomId, movementType: "SALES_RETURN", referenceType: "SALES_CREDIT_NOTE", referenceId: note.id, remarks: `Sales credit note ${note.creditNoteNumber}`, createdByUserId: context.actorId });
          }
        }
        const creditedInvoice = assertFound(await invoiceRepository.applySalesInvoiceCredit(tenantId, invoice.id, note.totalAmount, context.actorId), "Sales invoice");
        const postedNote = assertFound(await noteRepository.postSalesCreditNote(tenantId, id, postedJournal.id, parsed.postingDate, context.actorId), "Sales credit note");
        createAuditEvent("posted", tenantId, id, context.actorId, { event: events.posted, journalEntryId: postedJournal.id, invoiceId: creditedInvoice.id });
        return { creditNote: postedNote, journalEntry: postedJournal, invoice: creditedInvoice };
      };
      if (repository === salesCreditNotesRepository && invoices === salesInvoicesRepository && accounting === accountingService && inventory === inventoryStockRepository) {
        return getTenantKnex().transaction(async (trx) => postWith(createSalesCreditNotesRepository(trx), createSalesInvoicesRepository(trx), createAccountingService(createAccountingRepository(trx)), createInventoryStockRepository(trx)));
      }
      return postWith(repository, invoices, accounting, inventory);
    },
    async getLines(tenantId: string, id: string, context: SalesCreditNoteActionContext) {
      const note = assertFound(await repository.getSalesCreditNoteById(tenantId, id), "Sales credit note");
      assertPermission(context, permissions.view, note);
      return repository.getSalesCreditNoteLines(tenantId, id);
    },
    async getByInvoice(tenantId: string, invoiceId: string, context: SalesCreditNoteActionContext) {
      assertPermission(context, permissions.view);
      return repository.getSalesCreditNotesByInvoice(tenantId, invoiceId);
    },
  };
}

export const salesCreditNotesService = createSalesCreditNotesService();
export const creditNotesService = salesCreditNotesService;

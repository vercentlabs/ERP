import { getTenantKnex } from "@vercent/database/knex";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { createAccountingRepository } from "../../finance/accounting/repository";
import { accountingService, createAccountingService } from "../../finance/accounting/service";
import type { JournalEntryRecord } from "../../finance/accounting/types";
import { masterDataRepository } from "../../master-data/foundation/repository";
import type { MasterDataRepository } from "../../master-data/foundation/types";
import { createSalesInvoicesRepository, salesInvoicesRepository } from "../invoices/repository";
import type { SalesInvoiceRecord, SalesInvoiceRepository } from "../invoices/types";
import { createAuditEvent } from "./audit";
import { events } from "./events";
import { permissions } from "./permissions";
import { calculateSalesDebitNoteLine, createSalesDebitNotesRepository, salesDebitNotesRepository } from "./repository";
import { createSalesDebitNoteFromInvoiceSchema, postSalesDebitNoteSchema, salesDebitNoteCreateSchema, salesDebitNoteListSchema, salesDebitNoteUpdateSchema } from "./schemas";
import type {
  SalesDebitNoteActionContext,
  SalesDebitNoteCreateInput,
  SalesDebitNoteLineInput,
  SalesDebitNoteLineRecord,
  SalesDebitNoteRecord,
  SalesDebitNoteRepository,
  SalesDebitNoteUpdateInput,
} from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => { if (!decision.allowed) throw new Error(decision.reasons.join("; ")); };
const assertPermission = (context: SalesDebitNoteActionContext, permission: string, record?: unknown) => assertAllowed(evaluatePolicy({ actor: context, permission, record: record as never }));
const assertFound = <T>(record: T | undefined, label: string) => { if (!record) throw new Error(`${label} was not found`); return record; };

export function createSalesDebitNotesService(
  repository: SalesDebitNoteRepository = salesDebitNotesRepository,
  invoices: SalesInvoiceRepository = salesInvoicesRepository,
  masterData: MasterDataRepository = masterDataRepository,
  accounting: typeof accountingService = accountingService,
) {
  function assertDebitEligibleInvoice(invoice: SalesInvoiceRecord) {
    if (invoice.status !== "ISSUED") throw new Error("Only ISSUED sales invoices can receive debit notes");
    if (invoice.accountingStatus !== "POSTED") throw new Error("Sales invoice must be posted to accounting before debit note");
    if (invoice.deletedAt) throw new Error("Deleted sales invoices cannot receive debit notes");
  }

  async function buildLines(tenantId: string, invoice: SalesInvoiceRecord, inputLines: SalesDebitNoteLineInput[]) {
    const lines: SalesDebitNoteLineRecord[] = [];
    for (const [index, input] of inputLines.entries()) {
      const invoiceLine = input.salesInvoiceLineId ? invoice.lines.find((line) => line.id === input.salesInvoiceLineId) : undefined;
      if (input.salesInvoiceLineId && !invoiceLine) throw new Error("Debit note line must reference a line from the selected invoice");
      const item = assertFound(await masterData.getItemById(tenantId, input.itemId), "Item");
      assertFound(await masterData.getUomById(tenantId, input.uomId), "UOM");
      lines.push(calculateSalesDebitNoteLine({
        id: crypto.randomUUID(),
        debitNoteId: "",
        salesInvoiceLineId: input.salesInvoiceLineId,
        lineNumber: index + 1,
        itemId: input.itemId,
        itemName: input.itemName ?? invoiceLine?.itemName ?? item.name,
        description: input.description ?? invoiceLine?.description ?? item.description,
        quantity: input.quantity,
        uomId: input.uomId,
        unitAmount: input.unitAmount,
        taxRate: input.taxRate ?? 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    }
    return lines;
  }

  async function buildLinesFromInvoice(invoice: SalesInvoiceRecord) {
    return invoice.lines.map((line, index) => calculateSalesDebitNoteLine({
      id: crypto.randomUUID(),
      debitNoteId: "",
      salesInvoiceLineId: line.id,
      lineNumber: index + 1,
      itemId: line.itemId,
      itemName: line.itemName,
      description: line.description,
      quantity: line.quantity,
      uomId: line.uomId,
      unitAmount: line.unitPrice,
      taxRate: line.taxRate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  }

  async function buildJournal(note: SalesDebitNoteRecord, context: SalesDebitNoteActionContext, accountingClient: typeof accountingService) {
    const settings = await accountingClient.getAccountingSettings(note.tenantId, context, note.companyId, note.branchId);
    if (!settings) throw new Error("Accounting settings are required before posting debit notes");
    if (!settings.additionalChargesIncomeAccountId) throw new Error("Additional charges income account is required before posting debit notes");
    const chargesAccount = await accountingClient.getAccountById(note.tenantId, settings.additionalChargesIncomeAccountId, context);
    if (!chargesAccount.isActive) throw new Error("Additional charges income account must be active");
    const arAccount = await accountingClient.getAccountById(note.tenantId, settings.accountsReceivableAccountId, context);
    if (!arAccount.isActive) throw new Error("Accounts receivable account must be active");
    if (note.taxAmount > 0) {
      if (!settings.salesTaxPayableAccountId) throw new Error("Sales tax payable account is required when debit note adds tax");
      const taxAccount = await accountingClient.getAccountById(note.tenantId, settings.salesTaxPayableAccountId, context);
      if (!taxAccount.isActive) throw new Error("Sales tax payable account must be active");
    }
    const postingDate = note.postingDate ?? note.debitNoteDate;
    const fiscalYear = await accountingClient.resolveOpenFiscalYearForDate(note.tenantId, postingDate, context, note.companyId);
    const creditLines = [{ accountId: settings.additionalChargesIncomeAccountId, creditAmount: note.taxableAmount, narration: `Sales debit note ${note.debitNoteNumber}` }];
    if (note.taxAmount > 0) creditLines.push({ accountId: settings.salesTaxPayableAccountId!, creditAmount: note.taxAmount, narration: `Tax on ${note.debitNoteNumber}` });
    return accountingClient.createJournalEntry({
      tenantId: note.tenantId,
      companyId: note.companyId,
      branchId: note.branchId,
      journalDate: note.debitNoteDate,
      postingDate,
      fiscalYearId: fiscalYear.id,
      referenceType: "SALES_DEBIT_NOTE",
      referenceId: note.id,
      sourceModule: "SALES",
      narration: `Sales debit note ${note.debitNoteNumber}`,
      lines: [{ accountId: settings.accountsReceivableAccountId, customerId: note.customerId, partyId: note.partyId, debitAmount: note.totalAmount, narration: `Increase receivable ${note.debitNoteNumber}` }, ...creditLines],
    }, context) as Promise<JournalEntryRecord>;
  }

  return {
    async list(input: unknown, context?: SalesDebitNoteActionContext) {
      const parsed = salesDebitNoteListSchema.parse(input);
      if (context) assertPermission(context, permissions.view);
      return repository.listSalesDebitNotes(parsed);
    },
    async stats(input: unknown, context: SalesDebitNoteActionContext) {
      const parsed = salesDebitNoteListSchema.pick({ tenantId: true, companyId: true, branchId: true }).parse(input);
      assertPermission(context, permissions.view);
      return repository.getSalesDebitNoteStats(parsed.tenantId, parsed);
    },
    async getById(tenantId: string, id: string, context: SalesDebitNoteActionContext) {
      const note = assertFound(await repository.getSalesDebitNoteById(tenantId, id), "Sales debit note");
      assertPermission(context, permissions.view, note);
      return note;
    },
    async create(input: unknown, context: SalesDebitNoteActionContext) {
      const parsed = salesDebitNoteCreateSchema.parse(input) as SalesDebitNoteCreateInput;
      assertPermission(context, permissions.create);
      const invoice = assertFound(await invoices.getSalesInvoiceById(parsed.tenantId, parsed.salesInvoiceId), "Sales invoice");
      assertDebitEligibleInvoice(invoice);
      const lines = await buildLines(parsed.tenantId, invoice, parsed.lines);
      const totals = repository.calculateSalesDebitNoteTotals(lines);
      const note = await repository.createSalesDebitNote({ ...parsed, companyId: parsed.companyId ?? invoice.companyId, branchId: parsed.branchId ?? invoice.branchId, customerId: invoice.customerId, partyId: invoice.partyId }, lines, totals, context.actorId);
      createAuditEvent("created", note.tenantId, note.id, context.actorId, { event: events.created });
      return note;
    },
    async createFromInvoice(tenantId: string, invoiceId: string, input: unknown, context: SalesDebitNoteActionContext) {
      const parsed = createSalesDebitNoteFromInvoiceSchema.parse({ tenantId, ...(input as object) });
      assertPermission(context, permissions.create);
      const invoice = assertFound(await invoices.getSalesInvoiceById(tenantId, invoiceId), "Sales invoice");
      assertDebitEligibleInvoice(invoice);
      const lines = parsed.lines ? await buildLines(tenantId, invoice, parsed.lines) : await buildLinesFromInvoice(invoice);
      const totals = repository.calculateSalesDebitNoteTotals(lines);
      const note = await repository.createSalesDebitNote({ ...parsed, salesInvoiceId: invoiceId, lines: parsed.lines ?? [], companyId: invoice.companyId, branchId: invoice.branchId, customerId: invoice.customerId, partyId: invoice.partyId }, lines, totals, context.actorId);
      createAuditEvent("createdFromInvoice", note.tenantId, note.id, context.actorId, { event: events.createdFromInvoice, invoiceId });
      return note;
    },
    async update(tenantId: string, id: string, input: unknown, context: SalesDebitNoteActionContext) {
      const current = assertFound(await repository.getSalesDebitNoteById(tenantId, id), "Sales debit note");
      assertPermission(context, permissions.update, current);
      if (current.status !== "DRAFT") throw new Error("Only DRAFT debit notes can be edited");
      const parsed = salesDebitNoteUpdateSchema.parse(input) as SalesDebitNoteUpdateInput;
      const invoice = assertFound(await invoices.getSalesInvoiceById(tenantId, current.salesInvoiceId), "Sales invoice");
      const lines = parsed.lines ? await buildLines(tenantId, invoice, parsed.lines) : undefined;
      const totals = lines ? repository.calculateSalesDebitNoteTotals(lines) : undefined;
      const updated = assertFound(await repository.updateSalesDebitNote(tenantId, id, parsed, lines, totals, context.actorId), "Sales debit note");
      createAuditEvent("updated", tenantId, id, context.actorId, { event: events.updated });
      return updated;
    },
    async softDelete(tenantId: string, id: string, context: SalesDebitNoteActionContext) {
      const current = assertFound(await repository.getSalesDebitNoteById(tenantId, id), "Sales debit note");
      assertPermission(context, permissions.delete, current);
      if (current.status !== "DRAFT") throw new Error("Only DRAFT debit notes can be deleted");
      return assertFound(await repository.softDeleteSalesDebitNote(tenantId, id, context.actorId), "Sales debit note");
    },
    async cancel(tenantId: string, id: string, context: SalesDebitNoteActionContext) {
      const current = assertFound(await repository.getSalesDebitNoteById(tenantId, id), "Sales debit note");
      assertPermission(context, permissions.cancel, current);
      if (current.status !== "DRAFT") throw new Error("Only DRAFT debit notes can be cancelled");
      return assertFound(await repository.cancelDraftSalesDebitNote(tenantId, id, context.actorId), "Sales debit note");
    },
    async post(tenantId: string, id: string, input: unknown, context: SalesDebitNoteActionContext) {
      const parsed = postSalesDebitNoteSchema.parse(input);
      const postWith = async (noteRepository: SalesDebitNoteRepository, invoiceRepository: SalesInvoiceRepository, accountingClient: typeof accountingService) => {
        const note = assertFound(await noteRepository.getSalesDebitNoteById(tenantId, id), "Sales debit note");
        assertPermission(context, permissions.post, note);
        if (note.status !== "DRAFT") throw new Error("Only DRAFT debit notes can be posted");
        if (note.accountingStatus === "POSTED" || note.journalEntryId) throw new Error("Sales debit note is already posted");
        const invoice = assertFound(await invoiceRepository.getSalesInvoiceById(tenantId, note.salesInvoiceId), "Sales invoice");
        assertDebitEligibleInvoice(invoice);
        const noteForPosting = parsed.postingDate ? { ...note, postingDate: parsed.postingDate } : note;
        const journal = await buildJournal(noteForPosting, context, accountingClient);
        const postedJournal = await accountingClient.postJournalEntry(tenantId, journal.id, context);
        const debitedInvoice = assertFound(await invoiceRepository.applySalesInvoiceDebit(tenantId, invoice.id, note.totalAmount, context.actorId), "Sales invoice");
        const postedNote = assertFound(await noteRepository.postSalesDebitNote(tenantId, id, postedJournal.id, parsed.postingDate, context.actorId), "Sales debit note");
        createAuditEvent("posted", tenantId, id, context.actorId, { event: events.posted, journalEntryId: postedJournal.id, invoiceId: debitedInvoice.id });
        return { debitNote: postedNote, journalEntry: postedJournal, invoice: debitedInvoice };
      };
      if (repository === salesDebitNotesRepository && invoices === salesInvoicesRepository && accounting === accountingService) {
        return getTenantKnex().transaction(async (trx) => postWith(createSalesDebitNotesRepository(trx), createSalesInvoicesRepository(trx), createAccountingService(createAccountingRepository(trx))));
      }
      return postWith(repository, invoices, accounting);
    },
    async getLines(tenantId: string, id: string, context: SalesDebitNoteActionContext) {
      const note = assertFound(await repository.getSalesDebitNoteById(tenantId, id), "Sales debit note");
      assertPermission(context, permissions.view, note);
      return repository.getSalesDebitNoteLines(tenantId, id);
    },
    async getByInvoice(tenantId: string, invoiceId: string, context: SalesDebitNoteActionContext) {
      assertPermission(context, permissions.view);
      return repository.getSalesDebitNotesByInvoice(tenantId, invoiceId);
    },
  };
}

export const salesDebitNotesService = createSalesDebitNotesService();
export const debitNotesService = salesDebitNotesService;

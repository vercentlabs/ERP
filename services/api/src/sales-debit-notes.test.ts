import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import type { AccountRecord, AccountingSettingsRecord, FiscalYearRecord, JournalEntryRecord } from "../../../modules/finance/accounting/types";
import type { Item, MasterDataRepository, Uom } from "../../../modules/master-data/foundation/types";
import { createSalesDebitNotesService } from "../../../modules/sales/debit-notes/service";
import type { SalesDebitNoteCreateInput, SalesDebitNoteLineRecord, SalesDebitNoteListRequest, SalesDebitNoteRecord, SalesDebitNoteRepository, SalesDebitNoteStatus, SalesDebitNoteUpdateInput } from "../../../modules/sales/debit-notes/types";
import type { SalesInvoiceRecord, SalesInvoiceRepository } from "../../../modules/sales/invoices/types";
import { createApiService } from "./index";

const context = { tenantId: "tenant-a", actorId: "user-a", roles: ["admin"], permissions: ["*"] };
const now = () => new Date().toISOString();
const ids = {
  invoice: "00000000-0000-4000-8000-000000008001",
  line: "00000000-0000-4000-8000-000000008002",
  item: "00000000-0000-4000-8000-000000008003",
  uom: "00000000-0000-4000-8000-000000008004",
  customer: "00000000-0000-4000-8000-000000008005",
  party: "00000000-0000-4000-8000-000000008006",
  ar: "00000000-0000-4000-8000-000000008007",
  charges: "00000000-0000-4000-8000-000000008008",
  tax: "00000000-0000-4000-8000-000000008009",
  fiscalYear: "00000000-0000-4000-8000-000000008010",
};

function invoice(options: Partial<SalesInvoiceRecord> = {}): SalesInvoiceRecord {
  return {
    id: ids.invoice, tenantId: context.tenantId, invoiceNumber: "SINV-1", customerId: ids.customer, partyId: ids.party, invoiceDate: "2026-06-21",
    status: "ISSUED", paymentStatus: "UNPAID", accountingStatus: "POSTED", journalEntryId: "journal-invoice", currency: "INR", exchangeRate: 1,
    subtotalAmount: 100, discountAmount: 0, taxableAmount: 100, taxAmount: 18, totalAmount: 118, amountPaid: 0, creditedAmount: 0, debitedAmount: 0, amountDue: 118,
    createdAt: now(), updatedAt: now(), lines: [{ id: ids.line, invoiceId: ids.invoice, lineNumber: 1, itemId: ids.item, itemName: "Service", quantity: 1, uomId: ids.uom, unitPrice: 100, discountPercent: 0, discountAmount: 0, taxableAmount: 100, taxRate: 18, taxAmount: 18, lineSubtotal: 100, lineTotal: 118, createdAt: now(), updatedAt: now() }],
    ...options,
  };
}

function fakeInvoices(initial = invoice()): SalesInvoiceRepository {
  const records = new Map([[initial.id, initial]]);
  const getSalesInvoiceById = async (tenantId: string, id: string) => {
    const row = records.get(id);
    return row && row.tenantId === tenantId && !row.deletedAt ? row : undefined;
  };
  return {
    getSalesInvoiceById,
    async applySalesInvoiceDebit(tenantId: string, id: string, debitedAmount: number) {
      const current = await getSalesInvoiceById(tenantId, id);
      if (!current || current.status !== "ISSUED" || current.accountingStatus !== "POSTED") return undefined;
      const amountDue = Math.round((current.amountDue + debitedAmount + Number.EPSILON) * 100) / 100;
      const updated: SalesInvoiceRecord = { ...current, debitedAmount: current.debitedAmount + debitedAmount, amountDue, paymentStatus: amountDue === 0 ? "PAID" : current.amountPaid > 0 ? "PARTIALLY_PAID" : "UNPAID", updatedAt: now() };
      records.set(id, updated);
      return updated;
    },
  } as unknown as SalesInvoiceRepository;
}

function fakeMasterData(): MasterDataRepository {
  const item: Item = { id: ids.item, tenantId: context.tenantId, itemNumber: "ITEM-1", name: "Service", itemType: "SERVICE", baseUomId: ids.uom, isStockItem: false, isSalesItem: true, isPurchaseItem: false, isManufacturingItem: false, currency: "INR", status: "ACTIVE", tags: [], customFields: {}, createdAt: now(), updatedAt: now() };
  const uom: Uom = { id: ids.uom, tenantId: context.tenantId, code: "NOS", name: "Nos", precision: 2, isBase: true, status: "ACTIVE", createdAt: now(), updatedAt: now() };
  return { async getItemById(_tenantId: string, id: string) { return id === ids.item ? item : undefined; }, async getUomById(_tenantId: string, id: string) { return id === ids.uom ? uom : undefined; } } as unknown as MasterDataRepository;
}

function fakeAccounting(options: { missingSettings?: boolean; inactive?: string; closedYear?: boolean } = {}) {
  const account = (id: string): AccountRecord => ({ id, tenantId: context.tenantId, accountCode: id, accountName: id, accountType: id === ids.ar ? "ASSET" : id === ids.tax ? "LIABILITY" : "INCOME", normalBalance: id === ids.ar ? "DEBIT" : "CREDIT", isControlAccount: false, isCashAccount: false, isBankAccount: false, isSystem: false, isActive: options.inactive !== id, openingBalance: 0, openingBalanceType: id === ids.ar ? "DEBIT" : "CREDIT", createdAt: now(), updatedAt: now() });
  const settings: AccountingSettingsRecord = { id: "settings", tenantId: context.tenantId, accountsReceivableAccountId: ids.ar, salesIncomeAccountId: "income", additionalChargesIncomeAccountId: ids.charges, salesTaxPayableAccountId: ids.tax, createdAt: now(), updatedAt: now() };
  let draft: JournalEntryRecord | undefined;
  return {
    async getAccountingSettings() { return options.missingSettings ? undefined : settings; },
    async getAccountById(_tenantId: string, id: string) { return account(id); },
    async resolveOpenFiscalYearForDate() { if (options.closedYear) throw new Error("Open fiscal year was not found"); return { id: ids.fiscalYear, tenantId: context.tenantId, name: "FY", startDate: "2026-04-01", endDate: "2027-03-31", status: "OPEN", isDefault: true, createdAt: now(), updatedAt: now() } satisfies FiscalYearRecord; },
    async createJournalEntry(input: { lines: JournalEntryRecord["lines"]; journalDate?: string; postingDate?: string; fiscalYearId: string; referenceType?: string; referenceId?: string; sourceModule?: string; narration?: string }) {
      const totalDebit = input.lines.reduce((sum, line) => sum + (line.debitAmount ?? 0), 0);
      const totalCredit = input.lines.reduce((sum, line) => sum + (line.creditAmount ?? 0), 0);
      if (totalDebit !== totalCredit) throw new Error("Journal entry must balance before posting");
      draft = { id: "journal-debit", tenantId: context.tenantId, journalNumber: "JE-DN", journalDate: input.journalDate ?? "2026-06-21", postingDate: input.postingDate, fiscalYearId: input.fiscalYearId, referenceType: input.referenceType, referenceId: input.referenceId, sourceModule: input.sourceModule, status: "DRAFT", narration: input.narration, totalDebit, totalCredit, createdAt: now(), updatedAt: now(), lines: input.lines.map((line, index) => ({ id: `jl-${index}`, journalEntryId: "journal-debit", lineNumber: index + 1, accountId: line.accountId, partyId: line.partyId, customerId: line.customerId, debitAmount: line.debitAmount ?? 0, creditAmount: line.creditAmount ?? 0, narration: line.narration, createdAt: now(), updatedAt: now() })) };
      return draft;
    },
    async postJournalEntry() { return { ...draft!, status: "POSTED", postedAt: now() }; },
  };
}

function fakeDebitRepo(): SalesDebitNoteRepository {
  const records = new Map<string, SalesDebitNoteRecord>();
  const active = (tenantId: string) => [...records.values()].filter((row) => row.tenantId === tenantId && !row.deletedAt);
  return {
    calculateSalesDebitNoteTotals(lines) { return { subtotalAmount: lines.reduce((s, l) => s + l.taxableAmount, 0), taxableAmount: lines.reduce((s, l) => s + l.taxableAmount, 0), taxAmount: lines.reduce((s, l) => s + l.taxAmount, 0), totalAmount: lines.reduce((s, l) => s + l.lineTotal, 0) }; },
    async createSalesDebitNote(input: SalesDebitNoteCreateInput & { customerId: string; partyId?: string }, lines: SalesDebitNoteLineRecord[], totals) { const id = `00000000-0000-4000-8000-00000000${8000 + records.size}`; const note: SalesDebitNoteRecord = { id, tenantId: input.tenantId, debitNoteNumber: input.debitNoteNumber ?? `SDN-${records.size + 1}`, salesInvoiceId: input.salesInvoiceId, customerId: input.customerId, partyId: input.partyId, debitNoteDate: input.debitNoteDate ?? "2026-06-21", postingDate: input.postingDate, status: "DRAFT", accountingStatus: "NOT_POSTED", ...totals, settledAmount: 0, amountDue: totals.totalAmount, reason: input.reason, notes: input.notes, createdAt: now(), updatedAt: now(), lines: lines.map((line) => ({ ...line, debitNoteId: id })) }; records.set(id, note); return note; },
    async listSalesDebitNotes(request: SalesDebitNoteListRequest) { let rows = active(request.tenantId); if (request.status) rows = rows.filter((row) => row.status === request.status); if (request.salesInvoiceId) rows = rows.filter((row) => row.salesInvoiceId === request.salesInvoiceId); return { rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 }; },
    async getSalesDebitNoteById(tenantId, id) { return active(tenantId).find((row) => row.id === id); },
    async getSalesDebitNoteByNumber(tenantId, debitNoteNumber) { return active(tenantId).find((row) => row.debitNoteNumber === debitNoteNumber); },
    async getSalesDebitNotesByInvoice(tenantId, salesInvoiceId) { return active(tenantId).filter((row) => row.salesInvoiceId === salesInvoiceId); },
    async updateSalesDebitNote(tenantId, id, input: SalesDebitNoteUpdateInput, lines, totals) { const current = await this.getSalesDebitNoteById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const updated = { ...current, ...input, ...(totals ?? {}), lines: lines?.map((line) => ({ ...line, debitNoteId: id })) ?? current.lines, updatedAt: now() }; records.set(id, updated); return updated; },
    async softDeleteSalesDebitNote(tenantId, id) { const current = await this.getSalesDebitNoteById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const deleted = { ...current, deletedAt: now() }; records.set(id, deleted); return deleted; },
    async postSalesDebitNote(tenantId, id, journalEntryId) { const current = await this.getSalesDebitNoteById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const posted: SalesDebitNoteRecord = { ...current, status: "POSTED", accountingStatus: "POSTED", journalEntryId, postedAt: now() }; records.set(id, posted); return posted; },
    async cancelDraftSalesDebitNote(tenantId, id) { const current = await this.getSalesDebitNoteById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const cancelled: SalesDebitNoteRecord = { ...current, status: "CANCELLED", cancelledAt: now() }; records.set(id, cancelled); return cancelled; },
    async applySalesDebitNoteCreditAllocation(tenantId, id, amount) { const current = await this.getSalesDebitNoteById(tenantId, id); if (!current || current.status !== "POSTED" || current.amountDue < amount) return undefined; const amountDue = Math.round((current.amountDue - amount + Number.EPSILON) * 100) / 100; const updated = { ...current, settledAmount: current.settledAmount + amount, amountDue, updatedAt: now() }; records.set(id, updated); return updated; },
    async getSalesDebitNoteLines(tenantId, id) { return (await this.getSalesDebitNoteById(tenantId, id))?.lines ?? []; },
    async getSalesDebitNoteStats(tenantId) { const rows = active(tenantId); const byStatus = Object.fromEntries((["DRAFT", "POSTED", "CANCELLED"] as SalesDebitNoteStatus[]).map((status) => [status, { count: rows.filter((row) => row.status === status).length, value: rows.filter((row) => row.status === status).reduce((sum, row) => sum + row.totalAmount, 0) }])); return { total: rows.length, draftValue: byStatus.DRAFT.value, postedValue: byStatus.POSTED.value, cancelledValue: byStatus.CANCELLED.value, byStatus: byStatus as never }; },
  };
}

const validInput = { tenantId: context.tenantId, salesInvoiceId: ids.invoice, lines: [{ salesInvoiceLineId: ids.line, itemId: ids.item, quantity: 1, uomId: ids.uom, unitAmount: 100, taxRate: 18 }] };
let server: Server | undefined;
afterEach(() => { server?.close(); server = undefined; });

describe("sales debit notes", () => {
  it("creates, posts, updates invoice, and blocks duplicate posting", async () => {
    const invoices = fakeInvoices(invoice({ amountPaid: 118, amountDue: 0, paymentStatus: "PAID" }));
    const service = createSalesDebitNotesService(fakeDebitRepo(), invoices, fakeMasterData(), fakeAccounting() as never);
    const note = await service.create(validInput, context);
    const result = await service.post(context.tenantId, note.id, {}, context);
    expect(result.journalEntry.totalDebit).toBe(118);
    expect(result.journalEntry.lines[0].accountId).toBe(ids.ar);
    expect(result.invoice.debitedAmount).toBe(118);
    expect(result.invoice.amountDue).toBe(118);
    expect(result.invoice.paymentStatus).toBe("PARTIALLY_PAID");
    await expect(service.post(context.tenantId, note.id, {}, context)).rejects.toThrow(/Only DRAFT/);
  });

  it("blocks invalid invoice states and missing accounting settings", async () => {
    await expect(createSalesDebitNotesService(fakeDebitRepo(), fakeInvoices(invoice({ status: "DRAFT" })), fakeMasterData(), fakeAccounting() as never).create(validInput, context)).rejects.toThrow(/ISSUED/);
    await expect(createSalesDebitNotesService(fakeDebitRepo(), fakeInvoices(invoice({ accountingStatus: "NOT_POSTED" })), fakeMasterData(), fakeAccounting() as never).create(validInput, context)).rejects.toThrow(/posted to accounting/);
    const missing = createSalesDebitNotesService(fakeDebitRepo(), fakeInvoices(), fakeMasterData(), fakeAccounting({ missingSettings: true }) as never);
    await expect(missing.post(context.tenantId, (await missing.create(validInput, context)).id, {}, context)).rejects.toThrow(/settings/);
    const inactive = createSalesDebitNotesService(fakeDebitRepo(), fakeInvoices(), fakeMasterData(), fakeAccounting({ inactive: ids.charges }) as never);
    await expect(inactive.post(context.tenantId, (await inactive.create(validInput, context)).id, {}, context)).rejects.toThrow(/active/);
    const closed = createSalesDebitNotesService(fakeDebitRepo(), fakeInvoices(), fakeMasterData(), fakeAccounting({ closedYear: true }) as never);
    await expect(closed.post(context.tenantId, (await closed.create(validInput, context)).id, {}, context)).rejects.toThrow(/Open fiscal year/);
  });

  it("prevents posted edits and supports draft cancel/delete", async () => {
    const service = createSalesDebitNotesService(fakeDebitRepo(), fakeInvoices(), fakeMasterData(), fakeAccounting() as never);
    const posted = await service.create(validInput, context);
    await service.post(context.tenantId, posted.id, {}, context);
    await expect(service.update(context.tenantId, posted.id, { notes: "blocked" }, context)).rejects.toThrow(/DRAFT/);
    const cancellable = await service.create(validInput, context);
    expect((await service.cancel(context.tenantId, cancellable.id, context)).status).toBe("CANCELLED");
    const deletable = await service.create(validInput, context);
    expect((await service.softDelete(context.tenantId, deletable.id, context)).deletedAt).toBeTruthy();
  });

  it("serves debit note API routes and invoice integration", async () => {
    const service = createSalesDebitNotesService(fakeDebitRepo(), fakeInvoices(), fakeMasterData(), fakeAccounting() as never);
    server = createApiService({ salesDebitNotes: service });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const port = (server.address() as { port: number }).port;
    const request = async (path: string, init?: RequestInit) => fetch(`http://127.0.0.1:${port}${path}`, { ...init, headers: { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*", ...(init?.headers ?? {}) } });
    const created = await request(`/api/sales/invoices/${ids.invoice}/create-debit-note`, { method: "POST", body: JSON.stringify({ lines: validInput.lines }) });
    expect(created.status).toBe(201);
    const note = await created.json() as SalesDebitNoteRecord;
    expect((await request("/api/sales/debit-notes")).status).toBe(200);
    expect((await request("/api/sales/debit-notes/stats")).status).toBe(200);
    expect((await request(`/api/sales/debit-notes/${note.id}`)).status).toBe(200);
    expect((await request(`/api/sales/debit-notes/${note.id}/lines`)).status).toBe(200);
    expect((await request(`/api/sales/invoices/${ids.invoice}/debit-notes`)).status).toBe(200);
    expect((await request(`/api/sales/debit-notes/${note.id}`, { method: "PATCH", body: JSON.stringify({ notes: "updated", lines: validInput.lines }) })).status).toBe(200);
    expect((await request(`/api/sales/debit-notes/${note.id}/post`, { method: "POST", body: JSON.stringify({}) })).status).toBe(200);
    const cancellable = await request("/api/sales/debit-notes", { method: "POST", body: JSON.stringify(validInput) }).then((response) => response.json() as Promise<SalesDebitNoteRecord>);
    expect((await request(`/api/sales/debit-notes/${cancellable.id}/cancel`, { method: "POST", body: JSON.stringify({}) })).status).toBe(200);
    const deletable = await request("/api/sales/debit-notes", { method: "POST", body: JSON.stringify(validInput) }).then((response) => response.json() as Promise<SalesDebitNoteRecord>);
    expect((await request(`/api/sales/debit-notes/${deletable.id}`, { method: "DELETE" })).status).toBe(200);
  });
});

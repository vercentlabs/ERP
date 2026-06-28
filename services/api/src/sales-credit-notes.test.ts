import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import type { AccountRecord, AccountingSettingsRecord, FiscalYearRecord, JournalEntryRecord } from "../../../modules/finance/accounting/types";
import type { InventoryStockRepository, StockLedgerEntryRecord } from "../../../modules/inventory/stock-ledger/types";
import type { Item, MasterDataRepository, Uom } from "../../../modules/master-data/foundation/types";
import { createSalesCreditNotesService } from "../../../modules/sales/credit-notes/service";
import type { SalesCreditNoteCreateInput, SalesCreditNoteLineRecord, SalesCreditNoteListRequest, SalesCreditNoteRecord, SalesCreditNoteRepository, SalesCreditNoteStatus, SalesCreditNoteUpdateInput } from "../../../modules/sales/credit-notes/types";
import type { SalesInvoiceRecord, SalesInvoiceRepository } from "../../../modules/sales/invoices/types";
import { createApiService } from "./index";

const context = { tenantId: "tenant-a", actorId: "user-a", roles: ["admin"], permissions: ["*"] };
const now = () => new Date().toISOString();
const ids = {
  invoice: "00000000-0000-4000-8000-000000009001",
  line: "00000000-0000-4000-8000-000000009002",
  item: "00000000-0000-4000-8000-000000009003",
  uom: "00000000-0000-4000-8000-000000009004",
  customer: "00000000-0000-4000-8000-000000009005",
  party: "00000000-0000-4000-8000-000000009006",
  ar: "00000000-0000-4000-8000-000000009007",
  returns: "00000000-0000-4000-8000-000000009008",
  tax: "00000000-0000-4000-8000-000000009009",
  fiscalYear: "00000000-0000-4000-8000-000000009010",
  warehouse: "00000000-0000-4000-8000-000000009011",
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
    async applySalesInvoiceCredit(tenantId: string, id: string, creditedAmount: number) {
      const current = await getSalesInvoiceById(tenantId, id);
      if (!current || current.status !== "ISSUED" || current.accountingStatus !== "POSTED" || current.amountDue < creditedAmount) return undefined;
      const amountDue = Math.round((current.amountDue - creditedAmount + Number.EPSILON) * 100) / 100;
      const updated: SalesInvoiceRecord = { ...current, creditedAmount: current.creditedAmount + creditedAmount, amountDue, paymentStatus: amountDue === 0 ? "PAID" : current.amountPaid > 0 ? "PARTIALLY_PAID" : "UNPAID", updatedAt: now() };
      records.set(id, updated);
      return updated;
    },
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

function fakeMasterData(stockItem = false): MasterDataRepository {
  const item: Item = { id: ids.item, tenantId: context.tenantId, itemNumber: "ITEM-1", name: "Service", itemType: stockItem ? "PRODUCT" : "SERVICE", baseUomId: ids.uom, isStockItem: stockItem, isSalesItem: true, isPurchaseItem: false, isManufacturingItem: false, currency: "INR", status: "ACTIVE", tags: [], customFields: {}, createdAt: now(), updatedAt: now() };
  const uom: Uom = { id: ids.uom, tenantId: context.tenantId, code: "NOS", name: "Nos", precision: 2, isBase: true, status: "ACTIVE", createdAt: now(), updatedAt: now() };
  return { async getItemById(_tenantId: string, id: string) { return id === ids.item ? item : undefined; }, async getUomById(_tenantId: string, id: string) { return id === ids.uom ? uom : undefined; } } as unknown as MasterDataRepository;
}

function fakeAccounting(options: { missingSettings?: boolean; inactive?: string; closedYear?: boolean } = {}) {
  const account = (id: string): AccountRecord => ({ id, tenantId: context.tenantId, accountCode: id, accountName: id, accountType: id === ids.ar || id === ids.tax ? "ASSET" : "INCOME", normalBalance: id === ids.returns ? "DEBIT" : "CREDIT", isControlAccount: false, isCashAccount: false, isBankAccount: false, isSystem: false, isActive: options.inactive !== id, openingBalance: 0, openingBalanceType: "DEBIT", createdAt: now(), updatedAt: now() });
  const settings: AccountingSettingsRecord = { id: "settings", tenantId: context.tenantId, accountsReceivableAccountId: ids.ar, salesIncomeAccountId: "income", salesReturnsAccountId: ids.returns, salesTaxPayableAccountId: ids.tax, createdAt: now(), updatedAt: now() };
  let draft: JournalEntryRecord | undefined;
  return {
    async getAccountingSettings() { return options.missingSettings ? undefined : settings; },
    async getAccountById(_tenantId: string, id: string) { return account(id); },
    async resolveOpenFiscalYearForDate() { if (options.closedYear) throw new Error("Open fiscal year was not found"); return { id: ids.fiscalYear, tenantId: context.tenantId, name: "FY", startDate: "2026-04-01", endDate: "2027-03-31", status: "OPEN", isDefault: true, createdAt: now(), updatedAt: now() } satisfies FiscalYearRecord; },
    async createJournalEntry(input: { lines: JournalEntryRecord["lines"]; journalDate?: string; postingDate?: string; fiscalYearId: string; referenceType?: string; referenceId?: string; sourceModule?: string; narration?: string }) {
      const totalDebit = input.lines.reduce((sum, line) => sum + (line.debitAmount ?? 0), 0);
      const totalCredit = input.lines.reduce((sum, line) => sum + (line.creditAmount ?? 0), 0);
      draft = { id: "journal-credit", tenantId: context.tenantId, journalNumber: "JE-CN", journalDate: input.journalDate ?? "2026-06-21", postingDate: input.postingDate, fiscalYearId: input.fiscalYearId, referenceType: input.referenceType, referenceId: input.referenceId, sourceModule: input.sourceModule, status: "DRAFT", narration: input.narration, totalDebit, totalCredit, createdAt: now(), updatedAt: now(), lines: input.lines.map((line, index) => ({ id: `jl-${index}`, journalEntryId: "journal-credit", lineNumber: index + 1, accountId: line.accountId, partyId: line.partyId, customerId: line.customerId, debitAmount: line.debitAmount ?? 0, creditAmount: line.creditAmount ?? 0, narration: line.narration, createdAt: now(), updatedAt: now() })) };
      return draft;
    },
    async postJournalEntry() { return { ...draft!, status: "POSTED", postedAt: now() }; },
  };
}

function fakeInventory() {
  const entries: StockLedgerEntryRecord[] = [];
  return {
    entries,
    async createStockLedgerEntry(input: StockLedgerEntryRecord) { const entry = { ...input, id: `sle-${entries.length + 1}`, entryNumber: `SLE-${entries.length + 1}`, postingDate: input.postingDate ?? "2026-06-21", postingTime: "10:00:00", createdAt: now() } as StockLedgerEntryRecord; entries.push(entry); return entry; },
  } as unknown as InventoryStockRepository & { entries: StockLedgerEntryRecord[] };
}

function fakeCreditRepo(): SalesCreditNoteRepository {
  const records = new Map<string, SalesCreditNoteRecord>();
  const active = (tenantId: string) => [...records.values()].filter((row) => row.tenantId === tenantId && !row.deletedAt);
  return {
    calculateSalesCreditNoteTotals(lines) { return { subtotalAmount: lines.reduce((s, l) => s + l.lineSubtotal, 0), discountAmount: lines.reduce((s, l) => s + l.discountAmount, 0), taxableAmount: lines.reduce((s, l) => s + l.taxableAmount, 0), taxAmount: lines.reduce((s, l) => s + l.taxAmount, 0), totalAmount: lines.reduce((s, l) => s + l.lineTotal, 0) }; },
    async createSalesCreditNote(input: SalesCreditNoteCreateInput & { customerId: string; partyId?: string; currency: string; exchangeRate: number }, lines: SalesCreditNoteLineRecord[], totals) { const id = `00000000-0000-4000-8000-00000000${9000 + records.size}`; const note: SalesCreditNoteRecord = { id, tenantId: input.tenantId, creditNoteNumber: input.creditNoteNumber ?? `SCN-${records.size + 1}`, salesInvoiceId: input.salesInvoiceId, customerId: input.customerId, partyId: input.partyId, creditNoteDate: input.creditNoteDate ?? "2026-06-21", postingDate: input.postingDate, status: "DRAFT", reason: input.reason, returnToStock: input.returnToStock ?? false, warehouseId: input.warehouseId, currency: input.currency, exchangeRate: input.exchangeRate, ...totals, notes: input.notes, createdAt: now(), updatedAt: now(), lines: lines.map((line) => ({ ...line, creditNoteId: id })) }; records.set(id, note); return note; },
    async listSalesCreditNotes(request: SalesCreditNoteListRequest) { let rows = active(request.tenantId); if (request.status) rows = rows.filter((row) => row.status === request.status); return { rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 }; },
    async getSalesCreditNoteById(tenantId, id) { return active(tenantId).find((row) => row.id === id); },
    async getSalesCreditNoteByNumber(tenantId, creditNoteNumber) { return active(tenantId).find((row) => row.creditNoteNumber === creditNoteNumber); },
    async getSalesCreditNotesByInvoice(tenantId, salesInvoiceId) { return active(tenantId).filter((row) => row.salesInvoiceId === salesInvoiceId); },
    async updateSalesCreditNote(tenantId, id, input: SalesCreditNoteUpdateInput, lines, totals) { const current = await this.getSalesCreditNoteById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const updated = { ...current, ...input, ...(totals ?? {}), lines: lines?.map((line) => ({ ...line, creditNoteId: id })) ?? current.lines, updatedAt: now() }; records.set(id, updated); return updated; },
    async softDeleteSalesCreditNote(tenantId, id) { const current = await this.getSalesCreditNoteById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const deleted = { ...current, deletedAt: now() }; records.set(id, deleted); return deleted; },
    async postSalesCreditNote(tenantId, id, journalEntryId) { const current = await this.getSalesCreditNoteById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const posted: SalesCreditNoteRecord = { ...current, status: "POSTED", journalEntryId, postedAt: now() }; records.set(id, posted); return posted; },
    async cancelDraftSalesCreditNote(tenantId, id) { const current = await this.getSalesCreditNoteById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const cancelled: SalesCreditNoteRecord = { ...current, status: "CANCELLED", cancelledAt: now() }; records.set(id, cancelled); return cancelled; },
    async getSalesCreditNoteLines(tenantId, id) { return (await this.getSalesCreditNoteById(tenantId, id))?.lines ?? []; },
    async getSalesCreditNoteStats(tenantId) { const rows = active(tenantId); const byStatus = Object.fromEntries((["DRAFT", "POSTED", "CANCELLED"] as SalesCreditNoteStatus[]).map((status) => [status, { count: rows.filter((row) => row.status === status).length, value: rows.filter((row) => row.status === status).reduce((sum, row) => sum + row.totalAmount, 0) }])); return { total: rows.length, draftValue: byStatus.DRAFT.value, postedValue: byStatus.POSTED.value, cancelledValue: byStatus.CANCELLED.value, byStatus: byStatus as never }; },
  };
}

const validInput = { tenantId: context.tenantId, salesInvoiceId: ids.invoice, lines: [{ salesInvoiceLineId: ids.line, itemId: ids.item, quantity: 1, uomId: ids.uom, unitPrice: 100, taxRate: 18 }] };
let server: Server | undefined;
afterEach(() => { server?.close(); server = undefined; });

describe("sales credit notes", () => {
  it("creates, posts, updates invoice, and blocks duplicate posting", async () => {
    const invoices = fakeInvoices();
    const service = createSalesCreditNotesService(fakeCreditRepo(), invoices, fakeMasterData(), fakeAccounting() as never, fakeInventory());
    const note = await service.create(validInput, context);
    const result = await service.post(context.tenantId, note.id, {}, context);
    expect(result.journalEntry.totalDebit).toBe(118);
    expect(result.invoice.creditedAmount).toBe(118);
    expect(result.invoice.amountDue).toBe(0);
    expect(result.invoice.paymentStatus).toBe("PAID");
    await expect(service.post(context.tenantId, note.id, {}, context)).rejects.toThrow(/Only DRAFT/);
  });

  it("blocks invalid invoice states and over-credit", async () => {
    await expect(createSalesCreditNotesService(fakeCreditRepo(), fakeInvoices(invoice({ status: "DRAFT" })), fakeMasterData(), fakeAccounting() as never, fakeInventory()).create(validInput, context)).rejects.toThrow(/ISSUED/);
    await expect(createSalesCreditNotesService(fakeCreditRepo(), fakeInvoices(invoice({ accountingStatus: "NOT_POSTED" })), fakeMasterData(), fakeAccounting() as never, fakeInventory()).create(validInput, context)).rejects.toThrow(/posted to accounting/);
    await expect(createSalesCreditNotesService(fakeCreditRepo(), fakeInvoices(invoice({ amountDue: 0, paymentStatus: "PAID" })), fakeMasterData(), fakeAccounting() as never, fakeInventory()).create(validInput, context)).rejects.toThrow(/Fully paid/);
    await expect(createSalesCreditNotesService(fakeCreditRepo(), fakeInvoices(invoice({ amountDue: 10 })), fakeMasterData(), fakeAccounting() as never, fakeInventory()).create(validInput, context)).rejects.toThrow(/exceed invoice amount due/);
  });

  it("records optional stock return", async () => {
    const inventory = fakeInventory();
    const service = createSalesCreditNotesService(fakeCreditRepo(), fakeInvoices(), fakeMasterData(true), fakeAccounting() as never, inventory);
    const note = await service.create({ ...validInput, returnToStock: true, warehouseId: ids.warehouse }, context);
    await service.post(context.tenantId, note.id, {}, context);
    expect(inventory.entries[0]?.movementType).toBe("SALES_RETURN");
  });

  it("serves credit note API routes and invoice integration", async () => {
    const service = createSalesCreditNotesService(fakeCreditRepo(), fakeInvoices(), fakeMasterData(), fakeAccounting() as never, fakeInventory());
    server = createApiService({ salesCreditNotes: service });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const port = (server.address() as { port: number }).port;
    const request = async (path: string, init?: RequestInit) => fetch(`http://127.0.0.1:${port}${path}`, { ...init, headers: { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*", ...(init?.headers ?? {}) } });
    const created = await request(`/api/sales/invoices/${ids.invoice}/create-credit-note`, { method: "POST", body: JSON.stringify({ lines: validInput.lines }) });
    expect(created.status).toBe(201);
    const note = await created.json() as SalesCreditNoteRecord;
    expect((await request("/api/sales/credit-notes")).status).toBe(200);
    expect((await request(`/api/sales/credit-notes/${note.id}`)).status).toBe(200);
    expect((await request(`/api/sales/credit-notes/${note.id}/lines`)).status).toBe(200);
    expect((await request(`/api/sales/invoices/${ids.invoice}/credit-notes`)).status).toBe(200);
    expect((await request(`/api/sales/credit-notes/${note.id}/post`, { method: "POST", body: JSON.stringify({}) })).status).toBe(200);
  });
});

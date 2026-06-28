import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import type { Customer, Item, MasterDataRepository, Uom } from "../../../modules/master-data/foundation/types";
import type { DeliveryNoteRecord, DeliveryNoteRepository } from "../../../modules/sales/delivery-notes/types";
import type { JournalEntryRecord } from "../../../modules/finance/accounting/types";
import { createSalesInvoicesService } from "../../../modules/sales/invoices/service";
import type { SalesInvoiceCreateInput, SalesInvoiceLineRecord, SalesInvoiceListRequest, SalesInvoiceRecord, SalesInvoiceRepository, SalesInvoiceStatus, SalesInvoiceTotals, SalesInvoiceUpdateInput } from "../../../modules/sales/invoices/types";
import type { SalesOrderRecord, SalesOrderRepository } from "../../../modules/sales/sales-orders/types";
import { createApiService } from "./index";

const context = { tenantId: "tenant-a", actorId: "user-a", roles: ["admin"], permissions: ["*"] };
const now = () => new Date().toISOString();
const ids = {
  customer: "00000000-0000-4000-8000-000000000101",
  party: "00000000-0000-4000-8000-000000000102",
  item: "00000000-0000-4000-8000-000000000103",
  service: "00000000-0000-4000-8000-000000000104",
  uom: "00000000-0000-4000-8000-000000000105",
  order: "00000000-0000-4000-8000-000000000106",
  orderLine: "00000000-0000-4000-8000-000000000107",
  deliveryNote: "00000000-0000-4000-8000-000000000108",
  deliveryLine: "00000000-0000-4000-8000-000000000109",
  arAccount: "00000000-0000-4000-8000-000000000130",
  incomeAccount: "00000000-0000-4000-8000-000000000131",
  taxAccount: "00000000-0000-4000-8000-000000000132",
  fiscalYear: "00000000-0000-4000-8000-000000000133",
  journal: "00000000-0000-4000-8000-000000000134",
};

function customer(): Customer { return { id: ids.customer, tenantId: context.tenantId, partyId: ids.party, customerNumber: "CUST-1", creditLimit: 0, currency: "INR", status: "ACTIVE", createdAt: now(), updatedAt: now() }; }
function uom(): Uom { return { id: ids.uom, tenantId: context.tenantId, code: "PCS", name: "Pieces", precision: 0, isBase: true, status: "ACTIVE", createdAt: now(), updatedAt: now() }; }
function item(stock = false): Item { return { id: stock ? ids.item : ids.service, tenantId: context.tenantId, itemNumber: stock ? "ITEM-1" : "SVC-1", name: stock ? "Stock Item" : "Service Item", itemType: stock ? "PRODUCT" : "SERVICE", baseUomId: ids.uom, isStockItem: stock, isSalesItem: true, isPurchaseItem: false, isManufacturingItem: false, currency: "INR", status: "ACTIVE", tags: [], customFields: {}, createdAt: now(), updatedAt: now() }; }
function order(status: SalesOrderRecord["status"] = "CONFIRMED", stock = false): SalesOrderRecord {
  const selected = item(stock);
  return { id: ids.order, tenantId: context.tenantId, orderNumber: "SO-1", customerId: ids.customer, partyId: ids.party, orderDate: "2026-06-21", status, currency: "INR", exchangeRate: 1, subtotalAmount: 200, discountAmount: 20, taxAmount: 32.4, totalAmount: 212.4, quotationId: "00000000-0000-4000-8000-000000000120", opportunityId: "00000000-0000-4000-8000-000000000121", createdAt: now(), updatedAt: now(), lines: [{ id: ids.orderLine, orderId: ids.order, lineNumber: 1, itemId: selected.id, itemName: selected.name, quantity: 2, uomId: ids.uom, unitPrice: 100, discountPercent: 10, discountAmount: 20, taxRate: 18, taxAmount: 32.4, lineSubtotal: 200, lineTotal: 212.4, createdAt: now(), updatedAt: now() }] };
}
function deliveryNote(status: DeliveryNoteRecord["status"] = "POSTED"): DeliveryNoteRecord {
  return { id: ids.deliveryNote, tenantId: context.tenantId, deliveryNoteNumber: "DN-1", salesOrderId: ids.order, customerId: ids.customer, partyId: ids.party, deliveryDate: "2026-06-21", status, createdAt: now(), updatedAt: now(), lines: [{ id: ids.deliveryLine, deliveryNoteId: ids.deliveryNote, salesOrderLineId: ids.orderLine, lineNumber: 1, itemId: ids.item, itemName: "Stock Item", orderedQuantity: 2, previouslyDeliveredQuantity: 0, quantity: 2, remainingQuantityAfterDelivery: 0, uomId: ids.uom, isStockItem: true, createdAt: now(), updatedAt: now() }] };
}
function fakeMasterData(): MasterDataRepository {
  return { async getCustomerById(_tenantId: string, id: string) { return id === ids.customer ? customer() : undefined; }, async getItemById(_tenantId: string, id: string) { return id === ids.item ? item(true) : id === ids.service ? item(false) : undefined; }, async getUomById(_tenantId: string, id: string) { return id === ids.uom ? uom() : undefined; } } as unknown as MasterDataRepository;
}
function fakeOrders(row = order()): SalesOrderRepository { return { async getSalesOrderById(_tenantId: string, id: string) { return id === row.id ? row : undefined; } } as unknown as SalesOrderRepository; }
function fakeDeliveryNotes(row = deliveryNote()): DeliveryNoteRepository { return { async getDeliveryNoteById(_tenantId: string, id: string) { return id === row.id ? row : undefined; } } as unknown as DeliveryNoteRepository; }
function totals(lines: SalesInvoiceLineRecord[]): SalesInvoiceTotals {
  const totalAmount = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  return { subtotalAmount: lines.reduce((sum, line) => sum + line.lineSubtotal, 0), discountAmount: lines.reduce((sum, line) => sum + line.discountAmount, 0), taxableAmount: lines.reduce((sum, line) => sum + line.taxableAmount, 0), taxAmount: lines.reduce((sum, line) => sum + line.taxAmount, 0), totalAmount, amountPaid: 0, amountDue: totalAmount };
}
function fakeInvoiceRepository(): SalesInvoiceRepository {
  const records = new Map<string, SalesInvoiceRecord>();
  const active = (tenantId: string) => [...records.values()].filter((record) => record.tenantId === tenantId && !record.deletedAt);
  const create = async (input: SalesInvoiceCreateInput, lines: SalesInvoiceLineRecord[], calculated: SalesInvoiceTotals) => {
    const id = `00000000-0000-4000-8000-00000000${String(9000 + records.size + 1).slice(-4)}`;
    if (input.deliveryNoteId && [...records.values()].some((row) => row.deliveryNoteId === input.deliveryNoteId && !row.deletedAt)) throw new Error("duplicate delivery invoice");
    const record: SalesInvoiceRecord = { id, tenantId: input.tenantId, invoiceNumber: input.invoiceNumber ?? `SINV-${records.size + 1}`, customerId: input.customerId, partyId: input.partyId, salesOrderId: input.salesOrderId, deliveryNoteId: input.deliveryNoteId, opportunityId: input.opportunityId, quotationId: input.quotationId, invoiceDate: input.invoiceDate ?? "2026-06-21", dueDate: input.dueDate, status: "DRAFT", paymentStatus: "UNPAID", accountingStatus: "NOT_POSTED", currency: input.currency ?? "INR", exchangeRate: input.exchangeRate ?? 1, subtotalAmount: calculated.subtotalAmount, discountAmount: calculated.discountAmount, taxableAmount: calculated.taxableAmount, taxAmount: calculated.taxAmount, totalAmount: calculated.totalAmount, amountPaid: 0, creditedAmount: 0, debitedAmount: 0, amountDue: calculated.totalAmount, terms: input.terms, notes: input.notes, createdAt: now(), updatedAt: now(), lines: lines.map((line) => ({ ...line, invoiceId: id })) };
    records.set(id, record);
    return record;
  };
  return {
    calculateSalesInvoiceTotals: totals,
    createSalesInvoice: create,
    createSalesInvoiceFromDeliveryNote: create,
    createSalesInvoiceFromSalesOrder: create,
    async listSalesInvoices(request: SalesInvoiceListRequest) { let rows = active(request.tenantId); if (request.status) rows = rows.filter((row) => row.status === request.status); if (request.paymentStatus) rows = rows.filter((row) => row.paymentStatus === request.paymentStatus); if (request.search) rows = rows.filter((row) => row.invoiceNumber.includes(request.search!)); return { rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 }; },
    async getSalesInvoiceById(tenantId, id) { return active(tenantId).find((row) => row.id === id); },
    async getSalesInvoiceByNumber(tenantId, invoiceNumber) { return active(tenantId).find((row) => row.invoiceNumber === invoiceNumber); },
    async getSalesInvoicesBySalesOrder(tenantId, salesOrderId) { return active(tenantId).filter((row) => row.salesOrderId === salesOrderId); },
    async getSalesInvoiceByDeliveryNote(tenantId, deliveryNoteId) { return active(tenantId).find((row) => row.deliveryNoteId === deliveryNoteId); },
    async updateSalesInvoice(tenantId, id, input: SalesInvoiceUpdateInput, lines, calculated) { const current = await this.getSalesInvoiceById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const updated = { ...current, ...input, lines: lines?.map((line) => ({ ...line, invoiceId: id })) ?? current.lines, totalAmount: calculated?.totalAmount ?? current.totalAmount, amountDue: calculated?.amountDue ?? current.amountDue, updatedAt: now() }; records.set(id, updated); return updated; },
    async softDeleteSalesInvoice(tenantId, id) { const current = await this.getSalesInvoiceById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const deleted = { ...current, deletedAt: now() }; records.set(id, deleted); return deleted; },
    async issueSalesInvoice(tenantId, id) { const current = await this.getSalesInvoiceById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const issued: SalesInvoiceRecord = { ...current, status: "ISSUED", issuedAt: now() }; records.set(id, issued); return issued; },
    async cancelDraftSalesInvoice(tenantId, id) { const current = await this.getSalesInvoiceById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const cancelled: SalesInvoiceRecord = { ...current, status: "CANCELLED", cancelledAt: now() }; records.set(id, cancelled); return cancelled; },
    async postSalesInvoiceToAccounting(tenantId, id, journalEntryId) { const current = await this.getSalesInvoiceById(tenantId, id); if (!current || current.status !== "ISSUED" || current.accountingStatus === "POSTED") return undefined; const posted: SalesInvoiceRecord = { ...current, accountingStatus: "POSTED", journalEntryId, accountingPostedAt: now() }; records.set(id, posted); return posted; },
    async applySalesInvoicePayment(tenantId, id, allocatedAmount) { const current = await this.getSalesInvoiceById(tenantId, id); if (!current || current.status !== "ISSUED" || current.accountingStatus !== "POSTED" || current.amountDue < allocatedAmount) return undefined; const amountPaid = current.amountPaid + allocatedAmount; const amountDue = Math.round((current.amountDue - allocatedAmount + Number.EPSILON) * 100) / 100; const updated: SalesInvoiceRecord = { ...current, amountPaid, amountDue, paymentStatus: amountDue === 0 ? "PAID" : "PARTIALLY_PAID", updatedAt: now() }; records.set(id, updated); return updated; },
    async applySalesInvoiceCredit(tenantId, id, creditedAmount) { const current = await this.getSalesInvoiceById(tenantId, id); if (!current || current.status !== "ISSUED" || current.accountingStatus !== "POSTED" || current.amountDue < creditedAmount) return undefined; const amountDue = Math.round((current.amountDue - creditedAmount + Number.EPSILON) * 100) / 100; const updated: SalesInvoiceRecord = { ...current, creditedAmount: current.creditedAmount + creditedAmount, amountDue, paymentStatus: amountDue === 0 ? "PAID" : current.amountPaid > 0 ? "PARTIALLY_PAID" : "UNPAID", updatedAt: now() }; records.set(id, updated); return updated; },
    async applySalesInvoiceDebit(tenantId, id, debitedAmount) { const current = await this.getSalesInvoiceById(tenantId, id); if (!current || current.status !== "ISSUED" || current.accountingStatus !== "POSTED") return undefined; const amountDue = Math.round((current.amountDue + debitedAmount + Number.EPSILON) * 100) / 100; const updated: SalesInvoiceRecord = { ...current, debitedAmount: current.debitedAmount + debitedAmount, amountDue, paymentStatus: amountDue === 0 ? "PAID" : current.amountPaid > 0 ? "PARTIALLY_PAID" : "UNPAID", updatedAt: now() }; records.set(id, updated); return updated; },
    async getSalesInvoiceLines(tenantId, id) { return (await this.getSalesInvoiceById(tenantId, id))?.lines ?? []; },
    async getSalesInvoiceAccountingStatus(tenantId, id) { const current = await this.getSalesInvoiceById(tenantId, id); return current ? { id: current.id, tenantId: current.tenantId, companyId: current.companyId, branchId: current.branchId, invoiceNumber: current.invoiceNumber, accountingStatus: current.accountingStatus, journalEntryId: current.journalEntryId, accountingPostedAt: current.accountingPostedAt } : undefined; },
    async getSalesInvoiceJournalEntry(tenantId, id) { return (await this.getSalesInvoiceById(tenantId, id))?.journalEntryId; },
    async replaceDraftSalesInvoiceLines(_tenantId, invoiceId, lines) { return lines.map((line) => ({ ...line, invoiceId })); },
    async getSalesInvoiceStats(tenantId) { const rows = active(tenantId); const byStatus = Object.fromEntries((["DRAFT", "ISSUED", "CANCELLED"] as SalesInvoiceStatus[]).map((status) => [status, { count: rows.filter((row) => row.status === status).length, value: rows.filter((row) => row.status === status).reduce((sum, row) => sum + row.totalAmount, 0) }])); return { total: rows.length, draftValue: byStatus.DRAFT.value, issuedValue: byStatus.ISSUED.value, unpaidValue: rows.reduce((sum, row) => sum + row.amountDue, 0), overdueValue: 0, byStatus: byStatus as never }; },
  };
}

function fakeAccounting(options: { settings?: boolean; inactive?: string; closedYear?: boolean } = {}) {
  const journal = (status: JournalEntryRecord["status"]): JournalEntryRecord => ({ id: ids.journal, tenantId: context.tenantId, journalNumber: "JE-1", journalDate: "2026-06-21", postingDate: "2026-06-21", fiscalYearId: ids.fiscalYear, referenceType: "SALES_INVOICE", referenceId: "invoice", sourceModule: "SALES", status, totalDebit: 212.4, totalCredit: 212.4, createdAt: now(), updatedAt: now(), lines: [] });
  return {
    async getAccountingSettings() { return options.settings === false ? undefined : { id: "settings", tenantId: context.tenantId, accountsReceivableAccountId: ids.arAccount, salesIncomeAccountId: ids.incomeAccount, salesTaxPayableAccountId: ids.taxAccount, createdAt: now(), updatedAt: now() }; },
    async getAccountById(_tenantId: string, accountId: string) { return { id: accountId, tenantId: context.tenantId, accountCode: accountId, accountName: accountId, accountType: "ASSET", normalBalance: "DEBIT", isControlAccount: false, isCashAccount: false, isBankAccount: false, isSystem: false, isActive: options.inactive !== accountId, openingBalance: 0, openingBalanceType: "DEBIT", createdAt: now(), updatedAt: now() }; },
    async resolveOpenFiscalYearForDate() { if (options.closedYear) throw new Error("Open fiscal year was not found"); return { id: ids.fiscalYear, tenantId: context.tenantId, name: "FY", startDate: "2026-04-01", endDate: "2027-03-31", status: "OPEN", isDefault: true, createdAt: now(), updatedAt: now() }; },
    async createJournalEntry() { return journal("DRAFT"); },
    async postJournalEntry() { return journal("POSTED"); },
    async getJournalEntryById() { return journal("POSTED"); },
  };
}

const manualInput = { tenantId: context.tenantId, customerId: ids.customer, lines: [{ itemId: ids.service, uomId: ids.uom, quantity: 2, unitPrice: 100, discountPercent: 10, taxRate: 18 }] };
let server: Server | undefined;
afterEach(async () => { await new Promise<void>((resolve, reject) => { if (!server) return resolve(); server.close((error) => error ? reject(error) : resolve()); server = undefined; }); });

describe("sales invoices service", () => {
  it("creates manual invoices and validates customer, item, lines, totals, and amount due", async () => {
    const service = createSalesInvoicesService(fakeInvoiceRepository(), fakeMasterData(), fakeOrders(), fakeDeliveryNotes());
    const invoice = await service.create(manualInput, context);
    expect(invoice.partyId).toBe(ids.party);
    expect(invoice.totalAmount).toBe(212.4);
    expect(invoice.amountDue).toBe(212.4);
    await expect(service.create({ ...manualInput, lines: [] }, context)).rejects.toThrow();
    await expect(service.create({ ...manualInput, customerId: "00000000-0000-4000-8000-000000009999" }, context)).rejects.toThrow("Customer");
    await expect(service.create({ ...manualInput, lines: [{ ...manualInput.lines[0], itemId: "00000000-0000-4000-8000-000000009999" }] }, context)).rejects.toThrow("Item");
  });
  it("creates from posted delivery note, blocks draft delivery note and duplicate delivery invoice", async () => {
    const service = createSalesInvoicesService(fakeInvoiceRepository(), fakeMasterData(), fakeOrders(order("CONFIRMED", true)), fakeDeliveryNotes(deliveryNote("POSTED")));
    const invoice = await service.createFromDeliveryNote(context.tenantId, ids.deliveryNote, {}, context);
    expect(invoice.deliveryNoteId).toBe(ids.deliveryNote);
    await expect(service.createFromDeliveryNote(context.tenantId, ids.deliveryNote, {}, context)).rejects.toThrow("already");
    await expect(createSalesInvoicesService(fakeInvoiceRepository(), fakeMasterData(), fakeOrders(order("CONFIRMED", true)), fakeDeliveryNotes(deliveryNote("DRAFT"))).createFromDeliveryNote(context.tenantId, ids.deliveryNote, {}, context)).rejects.toThrow("POSTED");
  });
  it("creates from confirmed service sales order and blocks cancelled or stock direct invoice", async () => {
    await expect(createSalesInvoicesService(fakeInvoiceRepository(), fakeMasterData(), fakeOrders(order("CONFIRMED", false)), fakeDeliveryNotes()).createFromSalesOrder(context.tenantId, ids.order, {}, context)).resolves.toMatchObject({ salesOrderId: ids.order });
    await expect(createSalesInvoicesService(fakeInvoiceRepository(), fakeMasterData(), fakeOrders(order("CANCELLED", false)), fakeDeliveryNotes()).createFromSalesOrder(context.tenantId, ids.order, {}, context)).rejects.toThrow("CONFIRMED");
    await expect(createSalesInvoicesService(fakeInvoiceRepository(), fakeMasterData(), fakeOrders(order("CONFIRMED", true)), fakeDeliveryNotes()).createFromSalesOrder(context.tenantId, ids.order, {}, context)).rejects.toThrow("non-stock");
  });
  it("handles issue, cancel, immutable issued invoices, soft delete, list filters, and stats", async () => {
    const service = createSalesInvoicesService(fakeInvoiceRepository(), fakeMasterData(), fakeOrders(), fakeDeliveryNotes());
    const invoice = await service.create(manualInput, context);
    expect((await service.issue(context.tenantId, invoice.id, {}, context)).status).toBe("ISSUED");
    await expect(service.update(context.tenantId, invoice.id, { notes: "blocked" }, context)).rejects.toThrow("DRAFT");
    await expect(service.softDelete(context.tenantId, invoice.id, context)).rejects.toThrow("DRAFT");
    const cancel = await service.create(manualInput, context);
    expect((await service.cancel(context.tenantId, cancel.id, context)).status).toBe("CANCELLED");
    const deleted = await service.create(manualInput, context);
    await service.softDelete(context.tenantId, deleted.id, context);
    expect((await service.list({ tenantId: context.tenantId, search: "SINV" }, context)).total).toBeGreaterThan(0);
    expect((await service.stats({ tenantId: context.tenantId }, context)).issuedValue).toBeGreaterThan(0);
  });
  it("posts issued invoices to accounting and blocks invalid posting states", async () => {
    const service = createSalesInvoicesService(fakeInvoiceRepository(), fakeMasterData(), fakeOrders(), fakeDeliveryNotes(), fakeAccounting() as never);
    const invoice = await service.create(manualInput, context);
    await expect(service.postToAccounting(context.tenantId, invoice.id, {}, context)).rejects.toThrow("ISSUED");
    const issued = await service.issue(context.tenantId, invoice.id, {}, context);
    const posted = await service.postToAccounting(context.tenantId, issued.id, {}, context);
    expect(posted.invoice.accountingStatus).toBe("POSTED");
    expect(posted.invoice.journalEntryId).toBe(ids.journal);
    expect(posted.invoice.paymentStatus).toBe("UNPAID");
    await expect(service.postToAccounting(context.tenantId, issued.id, {}, context)).rejects.toThrow("already");
    const missingSettings = createSalesInvoicesService(fakeInvoiceRepository(), fakeMasterData(), fakeOrders(), fakeDeliveryNotes(), fakeAccounting({ settings: false }) as never);
    const missing = await missingSettings.issue(context.tenantId, (await missingSettings.create(manualInput, context)).id, {}, context);
    await expect(missingSettings.postToAccounting(context.tenantId, missing.id, {}, context)).rejects.toThrow("settings");
    const inactive = createSalesInvoicesService(fakeInvoiceRepository(), fakeMasterData(), fakeOrders(), fakeDeliveryNotes(), fakeAccounting({ inactive: ids.arAccount }) as never);
    const inactiveInvoice = await inactive.issue(context.tenantId, (await inactive.create(manualInput, context)).id, {}, context);
    await expect(inactive.postToAccounting(context.tenantId, inactiveInvoice.id, {}, context)).rejects.toThrow("active");
    const closed = createSalesInvoicesService(fakeInvoiceRepository(), fakeMasterData(), fakeOrders(), fakeDeliveryNotes(), fakeAccounting({ closedYear: true }) as never);
    const closedInvoice = await closed.issue(context.tenantId, (await closed.create(manualInput, context)).id, {}, context);
    await expect(closed.postToAccounting(context.tenantId, closedInvoice.id, {}, context)).rejects.toThrow("Open fiscal year");
  });
});

describe("sales invoices API routes", () => {
  it("serves invoice endpoints and order/delivery integrations", async () => {
    const invoiceService = createSalesInvoicesService(fakeInvoiceRepository(), fakeMasterData(), fakeOrders(order("CONFIRMED", false)), fakeDeliveryNotes(deliveryNote("POSTED")), fakeAccounting() as never);
    server = createApiService({ salesInvoices: invoiceService });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const address = server.address(); const port = typeof address === "object" && address ? address.port : 0; const baseUrl = `http://127.0.0.1:${port}`; const headers = { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*" };
    const created = await fetch(`${baseUrl}/api/sales/invoices`, { method: "POST", headers, body: JSON.stringify({ customerId: ids.customer, lines: manualInput.lines }) }).then((response) => response.json() as Promise<SalesInvoiceRecord>);
    expect(await fetch(`${baseUrl}/api/sales/invoices`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/accounting/invoices`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/invoices/stats`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/invoices/${created.id}`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/invoices/${created.id}/lines`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/invoices/${created.id}`, { method: "PATCH", headers, body: JSON.stringify({ customerId: ids.customer, lines: manualInput.lines }) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/invoices/${created.id}/issue`, { method: "POST", headers, body: JSON.stringify({}) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/invoices/${created.id}/post-accounting`, { method: "POST", headers, body: JSON.stringify({}) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/invoices/${created.id}/accounting`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/invoices/${created.id}/journal-entry`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/orders/${ids.order}/invoices`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/orders/${ids.order}/create-invoice`, { method: "POST", headers, body: JSON.stringify({}) }).then((response) => response.status)).toBe(201);
    expect(await fetch(`${baseUrl}/api/sales/delivery-notes/${ids.deliveryNote}/invoice`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/delivery-notes/${ids.deliveryNote}/create-invoice`, { method: "POST", headers, body: JSON.stringify({}) }).then((response) => response.status)).toBe(201);
    const cancellable = await fetch(`${baseUrl}/api/sales/invoices`, { method: "POST", headers, body: JSON.stringify({ customerId: ids.customer, lines: manualInput.lines }) }).then((response) => response.json() as Promise<SalesInvoiceRecord>);
    expect(await fetch(`${baseUrl}/api/sales/invoices/${cancellable.id}/cancel`, { method: "POST", headers, body: JSON.stringify({}) }).then((response) => response.status)).toBe(200);
    const deletable = await fetch(`${baseUrl}/api/sales/invoices`, { method: "POST", headers, body: JSON.stringify({ customerId: ids.customer, lines: manualInput.lines }) }).then((response) => response.json() as Promise<SalesInvoiceRecord>);
    expect(await fetch(`${baseUrl}/api/sales/invoices/${deletable.id}`, { method: "DELETE", headers }).then((response) => response.status)).toBe(200);
  });
});

import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import type { AccountRecord, AccountingSettingsRecord, FiscalYearRecord, JournalEntryRecord } from "../../../modules/finance/accounting/types";
import { createCustomerReceiptsService } from "../../../modules/finance/customer-receipts/service";
import type { CustomerReceiptAllocationRecord, CustomerReceiptCreateInput, CustomerReceiptListRequest, CustomerReceiptRecord, CustomerReceiptRepository, CustomerReceiptStatus, CustomerReceiptUpdateInput } from "../../../modules/finance/customer-receipts/types";
import type { Customer, MasterDataRepository } from "../../../modules/master-data/foundation/types";
import type { SalesInvoiceRecord, SalesInvoiceRepository } from "../../../modules/sales/invoices/types";
import { createApiService } from "./index";

const context = { tenantId: "tenant-a", actorId: "user-a", roles: ["admin"], permissions: ["*"] };
const now = () => new Date().toISOString();
const ids = {
  customer: "00000000-0000-4000-8000-000000001001",
  otherCustomer: "00000000-0000-4000-8000-000000001002",
  party: "00000000-0000-4000-8000-000000001003",
  invoice: "00000000-0000-4000-8000-000000001004",
  invoice2: "00000000-0000-4000-8000-000000001005",
  deposit: "00000000-0000-4000-8000-000000001006",
  ar: "00000000-0000-4000-8000-000000001007",
  fiscalYear: "00000000-0000-4000-8000-000000001008",
  journal: "00000000-0000-4000-8000-000000001009",
};

function customer(): Customer { return { id: ids.customer, tenantId: context.tenantId, partyId: ids.party, customerNumber: "CUST-1", creditLimit: 0, currency: "INR", status: "ACTIVE", createdAt: now(), updatedAt: now() }; }
function fakeMasterData(): MasterDataRepository {
  return { async getCustomerById(_tenantId: string, id: string) { return id === ids.customer ? customer() : undefined; } } as unknown as MasterDataRepository;
}
function invoice(id = ids.invoice, options: Partial<SalesInvoiceRecord> = {}): SalesInvoiceRecord {
  return { id, tenantId: context.tenantId, invoiceNumber: id === ids.invoice ? "SINV-1" : "SINV-2", customerId: ids.customer, partyId: ids.party, invoiceDate: "2026-06-21", status: "ISSUED", paymentStatus: "UNPAID", accountingStatus: "POSTED", journalEntryId: "journal-invoice", currency: "INR", exchangeRate: 1, subtotalAmount: 200, discountAmount: 0, taxableAmount: 200, taxAmount: 36, totalAmount: 236, amountPaid: 0, creditedAmount: 0, debitedAmount: 0, amountDue: 236, createdAt: now(), updatedAt: now(), lines: [], ...options };
}
function fakeInvoices(rows: SalesInvoiceRecord[] = [invoice(), invoice(ids.invoice2)]): SalesInvoiceRepository {
  const records = new Map(rows.map((row) => [row.id, row]));
  const getSalesInvoiceById = async (tenantId: string, id: string) => {
    const row = records.get(id);
    return row?.tenantId === tenantId && !row.deletedAt ? row : undefined;
  };
  return {
    getSalesInvoiceById,
    async applySalesInvoicePayment(tenantId: string, id: string, allocatedAmount: number) {
      const current = await getSalesInvoiceById(tenantId, id);
      if (!current || current.status !== "ISSUED" || current.accountingStatus !== "POSTED" || current.amountDue < allocatedAmount) return undefined;
      const amountPaid = Math.round((current.amountPaid + allocatedAmount + Number.EPSILON) * 100) / 100;
      const amountDue = Math.round((current.amountDue - allocatedAmount + Number.EPSILON) * 100) / 100;
      const updated: SalesInvoiceRecord = { ...current, amountPaid, amountDue, paymentStatus: amountDue === 0 ? "PAID" : amountPaid > 0 ? "PARTIALLY_PAID" : "UNPAID", updatedAt: now() };
      records.set(id, updated);
      return updated;
    },
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
function fakeAccounting(options: { missingSettings?: boolean; inactive?: string; closedYear?: boolean; badDeposit?: boolean } = {}) {
  const account = (id: string): AccountRecord => ({ id, tenantId: context.tenantId, accountCode: id, accountName: id, accountType: "ASSET", normalBalance: "DEBIT", isControlAccount: false, isCashAccount: id === ids.deposit && !options.badDeposit, isBankAccount: false, isSystem: false, isActive: options.inactive !== id, openingBalance: 0, openingBalanceType: "DEBIT", createdAt: now(), updatedAt: now() });
  const settings: AccountingSettingsRecord = { id: "settings", tenantId: context.tenantId, accountsReceivableAccountId: ids.ar, salesIncomeAccountId: "income", createdAt: now(), updatedAt: now() };
  let draft: JournalEntryRecord | undefined;
  return {
    async getAccountingSettings() { return options.missingSettings ? undefined : settings; },
    async getAccountById(_tenantId: string, id: string) { return account(id); },
    async resolveOpenFiscalYearForDate() { if (options.closedYear) throw new Error("Open fiscal year was not found"); return { id: ids.fiscalYear, tenantId: context.tenantId, name: "FY", startDate: "2026-04-01", endDate: "2027-03-31", status: "OPEN", isDefault: true, createdAt: now(), updatedAt: now() } satisfies FiscalYearRecord; },
    async createJournalEntry(input: { lines: JournalEntryRecord["lines"]; journalDate?: string; postingDate?: string; fiscalYearId: string; referenceType?: string; referenceId?: string; sourceModule?: string; narration?: string }) {
      const totalDebit = input.lines.reduce((sum, line) => sum + (line.debitAmount ?? 0), 0);
      const totalCredit = input.lines.reduce((sum, line) => sum + (line.creditAmount ?? 0), 0);
      if (totalDebit !== totalCredit) throw new Error("Journal entry must balance before posting");
      draft = { id: ids.journal, tenantId: context.tenantId, journalNumber: "JE-1", journalDate: input.journalDate ?? "2026-06-21", postingDate: input.postingDate, fiscalYearId: input.fiscalYearId, referenceType: input.referenceType, referenceId: input.referenceId, sourceModule: input.sourceModule, status: "DRAFT", narration: input.narration, totalDebit, totalCredit, createdAt: now(), updatedAt: now(), lines: input.lines.map((line, index) => ({ ...line, id: `line-${index}`, journalEntryId: ids.journal, lineNumber: index + 1, createdAt: now(), updatedAt: now() })) };
      return draft;
    },
    async postJournalEntry() { return { ...draft!, status: "POSTED", postedAt: now() }; },
    async getJournalEntryById() { return { ...draft!, status: "POSTED", postedAt: now() }; },
  };
}
function fakeReceiptRepository(): CustomerReceiptRepository {
  const records = new Map<string, CustomerReceiptRecord>();
  const active = (tenantId: string) => [...records.values()].filter((record) => record.tenantId === tenantId && !record.deletedAt);
  return {
    async createCustomerReceipt(input: CustomerReceiptCreateInput, allocations: CustomerReceiptAllocationRecord[]) { const id = `00000000-0000-4000-8000-00000000${String(7000 + records.size + 1).slice(-4)}`; const record: CustomerReceiptRecord = { id, tenantId: input.tenantId, receiptNumber: input.receiptNumber ?? `RCPT-${records.size + 1}`, customerId: input.customerId, partyId: input.partyId, receiptDate: input.receiptDate ?? "2026-06-21", postingDate: input.postingDate, status: "DRAFT", paymentMethod: input.paymentMethod, depositAccountId: input.depositAccountId, referenceNumber: input.referenceNumber, referenceDate: input.referenceDate, amountReceived: input.amountReceived, allocatedAmount: allocations.reduce((sum, allocation) => sum + allocation.allocatedAmount, 0), currency: input.currency ?? "INR", exchangeRate: input.exchangeRate ?? 1, notes: input.notes, createdAt: now(), updatedAt: now(), allocations: allocations.map((allocation) => ({ ...allocation, receiptId: id })) }; records.set(id, record); return record; },
    async listCustomerReceipts(request: CustomerReceiptListRequest) { let rows = active(request.tenantId); if (request.status) rows = rows.filter((row) => row.status === request.status); if (request.customerId) rows = rows.filter((row) => row.customerId === request.customerId); return { rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 }; },
    async getCustomerReceiptById(tenantId, id) { return active(tenantId).find((row) => row.id === id); },
    async getCustomerReceiptByNumber(tenantId, receiptNumber) { return active(tenantId).find((row) => row.receiptNumber === receiptNumber); },
    async updateCustomerReceipt(tenantId, id, input: CustomerReceiptUpdateInput, allocations) { const current = await this.getCustomerReceiptById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const updated = { ...current, ...input, allocations: allocations?.map((allocation) => ({ ...allocation, receiptId: id })) ?? current.allocations, allocatedAmount: allocations?.reduce((sum, allocation) => sum + allocation.allocatedAmount, 0) ?? current.allocatedAmount, updatedAt: now() }; records.set(id, updated); return updated; },
    async softDeleteCustomerReceipt(tenantId, id) { const current = await this.getCustomerReceiptById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const deleted = { ...current, deletedAt: now() }; records.set(id, deleted); return deleted; },
    async postCustomerReceipt(tenantId, id, journalEntryId, postingDate) { const current = await this.getCustomerReceiptById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const posted: CustomerReceiptRecord = { ...current, status: "POSTED", journalEntryId, postingDate: postingDate ?? current.postingDate, postedAt: now() }; records.set(id, posted); return posted; },
    async cancelDraftCustomerReceipt(tenantId, id) { const current = await this.getCustomerReceiptById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const cancelled: CustomerReceiptRecord = { ...current, status: "CANCELLED", cancelledAt: now() }; records.set(id, cancelled); return cancelled; },
    async getCustomerReceiptAllocations(tenantId, id) { return (await this.getCustomerReceiptById(tenantId, id))?.allocations ?? []; },
    async replaceDraftCustomerReceiptAllocations(_tenantId, receiptId, allocations) { return allocations.map((allocation) => ({ ...allocation, receiptId })); },
    async getCustomerReceiptsByInvoice(tenantId, salesInvoiceId) { return active(tenantId).filter((receipt) => receipt.allocations.some((allocation) => allocation.salesInvoiceId === salesInvoiceId)); },
    async getCustomerReceiptsByCustomer(tenantId, customerId) { return active(tenantId).filter((receipt) => receipt.customerId === customerId); },
    async getCustomerReceiptStats(tenantId) { const rows = active(tenantId); const byStatus = Object.fromEntries((["DRAFT", "POSTED", "CANCELLED"] as CustomerReceiptStatus[]).map((status) => [status, { count: rows.filter((row) => row.status === status).length, value: rows.filter((row) => row.status === status).reduce((sum, row) => sum + row.amountReceived, 0) }])); return { total: rows.length, draftValue: byStatus.DRAFT.value, postedValue: byStatus.POSTED.value, cancelledValue: byStatus.CANCELLED.value, byStatus: byStatus as never }; },
  };
}

const validInput = { tenantId: context.tenantId, customerId: ids.customer, paymentMethod: "BANK_TRANSFER", depositAccountId: ids.deposit, amountReceived: 100, allocations: [{ salesInvoiceId: ids.invoice, allocatedAmount: 100 }] };
let server: Server | undefined;
afterEach(async () => { await new Promise<void>((resolve, reject) => { if (!server) return resolve(); server.close((error) => error ? reject(error) : resolve()); server = undefined; }); });

describe("customer receipts service", () => {
  it("creates draft receipts and validates allocation rules", async () => {
    const service = createCustomerReceiptsService(fakeReceiptRepository(), fakeMasterData(), fakeInvoices(), fakeAccounting() as never);
    const receipt = await service.create(validInput, context);
    expect(receipt.status).toBe("DRAFT");
    expect(receipt.allocatedAmount).toBe(100);
    await expect(service.create({ ...validInput, allocations: [] }, context)).rejects.toThrow();
    await expect(service.create({ ...validInput, allocations: [{ salesInvoiceId: "00000000-0000-4000-8000-000000009999", allocatedAmount: 1 }] }, context)).rejects.toThrow("Sales invoice");
    await expect(createCustomerReceiptsService(fakeReceiptRepository(), fakeMasterData(), fakeInvoices([invoice(ids.invoice, { customerId: ids.otherCustomer })]), fakeAccounting() as never).create(validInput, context)).rejects.toThrow("same customer");
    await expect(createCustomerReceiptsService(fakeReceiptRepository(), fakeMasterData(), fakeInvoices([invoice(ids.invoice, { status: "DRAFT" })]), fakeAccounting() as never).create(validInput, context)).rejects.toThrow("ISSUED");
    await expect(createCustomerReceiptsService(fakeReceiptRepository(), fakeMasterData(), fakeInvoices([invoice(ids.invoice, { accountingStatus: "NOT_POSTED", journalEntryId: undefined })]), fakeAccounting() as never).create(validInput, context)).rejects.toThrow("accounting");
    await expect(service.create({ ...validInput, amountReceived: 101 }, context)).rejects.toThrow("Amount received");
    await expect(service.create({ ...validInput, amountReceived: 300, allocations: [{ salesInvoiceId: ids.invoice, allocatedAmount: 300 }] }, context)).rejects.toThrow("amount due");
  });
  it("posts receipts, creates accounting, updates invoices, and blocks invalid posting states", async () => {
    const invoiceRepo = fakeInvoices([invoice(ids.invoice, { amountDue: 236, amountPaid: 0 })]);
    const service = createCustomerReceiptsService(fakeReceiptRepository(), fakeMasterData(), invoiceRepo, fakeAccounting() as never);
    const partial = await service.create(validInput, context);
    const postedPartial = await service.post(context.tenantId, partial.id, {}, context);
    expect(postedPartial.receipt.status).toBe("POSTED");
    expect(postedPartial.journalEntry.totalDebit).toBe(100);
    expect(postedPartial.journalEntry.lines[0].accountId).toBe(ids.deposit);
    expect(postedPartial.journalEntry.lines[1].accountId).toBe(ids.ar);
    expect((await invoiceRepo.getSalesInvoiceById(context.tenantId, ids.invoice))?.paymentStatus).toBe("PARTIALLY_PAID");
    await expect(service.post(context.tenantId, partial.id, {}, context)).rejects.toThrow("DRAFT");
    const full = await service.create({ ...validInput, amountReceived: 136, allocations: [{ salesInvoiceId: ids.invoice, allocatedAmount: 136 }] }, context);
    await service.post(context.tenantId, full.id, {}, context);
    const paid = await invoiceRepo.getSalesInvoiceById(context.tenantId, ids.invoice);
    expect(paid?.amountDue).toBe(0);
    expect(paid?.paymentStatus).toBe("PAID");
    const missingSettings = createCustomerReceiptsService(fakeReceiptRepository(), fakeMasterData(), fakeInvoices(), fakeAccounting({ missingSettings: true }) as never);
    await expect(missingSettings.post(context.tenantId, (await missingSettings.create(validInput, context)).id, {}, context)).rejects.toThrow("settings");
    const inactive = createCustomerReceiptsService(fakeReceiptRepository(), fakeMasterData(), fakeInvoices(), fakeAccounting({ inactive: ids.deposit }) as never);
    await expect(inactive.post(context.tenantId, (await inactive.create(validInput, context)).id, {}, context)).rejects.toThrow("active");
    const badDeposit = createCustomerReceiptsService(fakeReceiptRepository(), fakeMasterData(), fakeInvoices(), fakeAccounting({ badDeposit: true }) as never);
    await expect(badDeposit.post(context.tenantId, (await badDeposit.create(validInput, context)).id, {}, context)).rejects.toThrow("cash or bank");
    const closedYear = createCustomerReceiptsService(fakeReceiptRepository(), fakeMasterData(), fakeInvoices(), fakeAccounting({ closedYear: true }) as never);
    await expect(closedYear.post(context.tenantId, (await closedYear.create(validInput, context)).id, {}, context)).rejects.toThrow("Open fiscal year");
  });
  it("prevents posted receipt edits and allows draft cancellation/deletion", async () => {
    const service = createCustomerReceiptsService(fakeReceiptRepository(), fakeMasterData(), fakeInvoices(), fakeAccounting() as never);
    const receipt = await service.create(validInput, context);
    await service.post(context.tenantId, receipt.id, {}, context);
    await expect(service.update(context.tenantId, receipt.id, { notes: "late" }, context)).rejects.toThrow("DRAFT");
    await expect(service.softDelete(context.tenantId, receipt.id, context)).rejects.toThrow("DRAFT");
    const draft = await service.create(validInput, context);
    expect((await service.cancel(context.tenantId, draft.id, context)).status).toBe("CANCELLED");
    const deletable = await service.create(validInput, context);
    expect((await service.softDelete(context.tenantId, deletable.id, context)).deletedAt).toBeTruthy();
  });
});

describe("customer receipts API routes", () => {
  it("serves receipt endpoints and invoice/customer integrations", async () => {
    const receiptService = createCustomerReceiptsService(fakeReceiptRepository(), fakeMasterData(), fakeInvoices(), fakeAccounting() as never);
    server = createApiService({ customerReceipts: receiptService });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const address = server.address(); const port = typeof address === "object" && address ? address.port : 0; const baseUrl = `http://127.0.0.1:${port}`; const headers = { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*" };
    const created = await fetch(`${baseUrl}/api/finance/customer-receipts`, { method: "POST", headers, body: JSON.stringify(validInput) }).then((response) => response.json() as Promise<CustomerReceiptRecord>);
    expect(await fetch(`${baseUrl}/api/finance/customer-receipts`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/customer-receipts/stats`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/customer-receipts/${created.id}`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/customer-receipts/${created.id}/allocations`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/customer-receipts/${created.id}`, { method: "PATCH", headers, body: JSON.stringify({ notes: "updated" }) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/customer-receipts/${created.id}/post`, { method: "POST", headers, body: JSON.stringify({}) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/sales/invoices/${ids.invoice}/receipts`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/master-data/customers/${ids.customer}/receipts`, { headers }).then((response) => response.status)).toBe(200);
    const fromInvoice = await fetch(`${baseUrl}/api/sales/invoices/${ids.invoice2}/create-receipt`, { method: "POST", headers, body: JSON.stringify({ depositAccountId: ids.deposit, amountReceived: 50 }) });
    expect(fromInvoice.status).toBe(201);
    const cancellable = await fetch(`${baseUrl}/api/finance/customer-receipts`, { method: "POST", headers, body: JSON.stringify({ ...validInput, allocations: [{ salesInvoiceId: ids.invoice2, allocatedAmount: 1 }], amountReceived: 1 }) }).then((response) => response.json() as Promise<CustomerReceiptRecord>);
    expect(await fetch(`${baseUrl}/api/finance/customer-receipts/${cancellable.id}/cancel`, { method: "POST", headers, body: JSON.stringify({}) }).then((response) => response.status)).toBe(200);
    const deletable = await fetch(`${baseUrl}/api/finance/customer-receipts`, { method: "POST", headers, body: JSON.stringify({ ...validInput, allocations: [{ salesInvoiceId: ids.invoice2, allocatedAmount: 1 }], amountReceived: 1 }) }).then((response) => response.json() as Promise<CustomerReceiptRecord>);
    expect(await fetch(`${baseUrl}/api/finance/customer-receipts/${deletable.id}`, { method: "DELETE", headers }).then((response) => response.status)).toBe(200);
  });
});

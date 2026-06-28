import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import type { AccountRecord, AccountingSettingsRecord, FiscalYearRecord, JournalEntryRecord } from "../../../modules/finance/accounting/types";
import { createCustomerRefundsService } from "../../../modules/finance/customer-refunds/service";
import type { CustomerRefundCreateInput, CustomerRefundRecord, CustomerRefundRepository, CustomerRefundStatus, CustomerRefundUpdateInput } from "../../../modules/finance/customer-refunds/types";
import type { Customer, MasterDataRepository } from "../../../modules/master-data/foundation/types";
import { createCreditNoteAllocationsService } from "../../../modules/sales/credit-note-allocations/service";
import type { CreditNoteAllocationCreateInput, CreditNoteAllocationRecord, CreditNoteAllocationRepository } from "../../../modules/sales/credit-note-allocations/types";
import type { SalesCreditNoteRecord, SalesCreditNoteRepository } from "../../../modules/sales/credit-notes/types";
import type { SalesDebitNoteRecord, SalesDebitNoteRepository } from "../../../modules/sales/debit-notes/types";
import type { SalesInvoiceRecord, SalesInvoiceRepository } from "../../../modules/sales/invoices/types";
import { createApiService } from "./index";

const context = { tenantId: "tenant-a", actorId: "user-a", roles: ["admin"], permissions: ["*"] };
const now = () => new Date().toISOString();
const ids = {
  creditNote: "00000000-0000-4000-8000-000000007001",
  invoice: "00000000-0000-4000-8000-000000007002",
  debitNote: "00000000-0000-4000-8000-000000007003",
  customer: "00000000-0000-4000-8000-000000007004",
  party: "00000000-0000-4000-8000-000000007005",
  ar: "00000000-0000-4000-8000-000000007006",
  bank: "00000000-0000-4000-8000-000000007007",
  fy: "00000000-0000-4000-8000-000000007008",
};

function customer(): Customer {
  return { id: ids.customer, tenantId: context.tenantId, partyId: ids.party, customerNumber: "CUST-1", creditLimit: 0, currency: "INR", status: "ACTIVE", createdAt: now(), updatedAt: now() };
}

function creditNote(options: Partial<SalesCreditNoteRecord> = {}): SalesCreditNoteRecord {
  return { id: ids.creditNote, tenantId: context.tenantId, creditNoteNumber: "SCN-1", salesInvoiceId: ids.invoice, customerId: ids.customer, partyId: ids.party, creditNoteDate: "2026-06-21", status: "POSTED", returnToStock: false, currency: "INR", exchangeRate: 1, subtotalAmount: 100, discountAmount: 0, taxableAmount: 100, taxAmount: 18, totalAmount: 118, allocatedAmount: 0, refundedAmount: 0, availableAmount: 118, journalEntryId: "je-credit", createdAt: now(), updatedAt: now(), lines: [], ...options };
}

function invoice(options: Partial<SalesInvoiceRecord> = {}): SalesInvoiceRecord {
  return { id: ids.invoice, tenantId: context.tenantId, invoiceNumber: "SINV-1", customerId: ids.customer, partyId: ids.party, invoiceDate: "2026-06-21", status: "ISSUED", paymentStatus: "UNPAID", accountingStatus: "POSTED", currency: "INR", exchangeRate: 1, subtotalAmount: 100, discountAmount: 0, taxableAmount: 100, taxAmount: 18, totalAmount: 118, amountPaid: 0, creditedAmount: 0, debitedAmount: 0, amountDue: 118, createdAt: now(), updatedAt: now(), lines: [], ...options };
}

function debitNote(options: Partial<SalesDebitNoteRecord> = {}): SalesDebitNoteRecord {
  return { id: ids.debitNote, tenantId: context.tenantId, debitNoteNumber: "SDN-1", salesInvoiceId: ids.invoice, customerId: ids.customer, partyId: ids.party, debitNoteDate: "2026-06-21", status: "POSTED", accountingStatus: "POSTED", subtotalAmount: 100, taxableAmount: 100, taxAmount: 18, totalAmount: 118, settledAmount: 0, amountDue: 118, journalEntryId: "je-debit", createdAt: now(), updatedAt: now(), lines: [], ...options };
}

function fakeMasterData(): MasterDataRepository {
  return { async getCustomerById(_tenantId: string, id: string) { return id === ids.customer ? customer() : undefined; } } as unknown as MasterDataRepository;
}

function fakeCreditNotes(initial = creditNote()): SalesCreditNoteRepository {
  const records = new Map([[initial.id, initial]]);
  const get = async (tenantId: string, id: string) => {
    const row = records.get(id);
    return row && row.tenantId === tenantId && !row.deletedAt ? row : undefined;
  };
  return {
    async getSalesCreditNoteById(tenantId: string, id: string) { return get(tenantId, id); },
    async applyCreditNoteAllocation(tenantId: string, id: string, amount: number) { const current = await get(tenantId, id); if (!current || current.availableAmount < amount) return undefined; const updated = { ...current, allocatedAmount: current.allocatedAmount + amount, availableAmount: current.availableAmount - amount, updatedAt: now() }; records.set(id, updated); return updated; },
    async applyCreditNoteRefund(tenantId: string, id: string, amount: number) { const current = await get(tenantId, id); if (!current || current.availableAmount < amount) return undefined; const updated = { ...current, refundedAmount: current.refundedAmount + amount, availableAmount: current.availableAmount - amount, updatedAt: now() }; records.set(id, updated); return updated; },
    async getCreditNoteAvailableAmount(tenantId: string, id: string) { return (await get(tenantId, id))?.availableAmount ?? 0; },
  } as unknown as SalesCreditNoteRepository;
}

function fakeInvoices(initial = invoice()): SalesInvoiceRepository {
  const records = new Map([[initial.id, initial]]);
  const getSalesInvoiceById = async (tenantId: string, id: string) => records.get(id)?.tenantId === tenantId ? records.get(id) : undefined;
  return {
    getSalesInvoiceById,
    async applySalesInvoiceCreditAllocation(tenantId: string, id: string, amount: number) { const current = await getSalesInvoiceById(tenantId, id); if (!current || current.amountDue < amount) return undefined; const amountDue = current.amountDue - amount; const paymentStatus: SalesInvoiceRecord["paymentStatus"] = amountDue === 0 ? "PAID" : current.amountPaid > 0 ? "PARTIALLY_PAID" : "UNPAID"; const updated = { ...current, amountDue, paymentStatus, updatedAt: now() }; records.set(id, updated); return updated; },
  } as unknown as SalesInvoiceRepository;
}

function fakeDebitNotes(initial = debitNote()): SalesDebitNoteRepository {
  const records = new Map([[initial.id, initial]]);
  const getSalesDebitNoteById = async (tenantId: string, id: string) => records.get(id)?.tenantId === tenantId ? records.get(id) : undefined;
  return {
    getSalesDebitNoteById,
    async applySalesDebitNoteCreditAllocation(tenantId: string, id: string, amount: number) { const current = await getSalesDebitNoteById(tenantId, id); if (!current || current.amountDue < amount) return undefined; const updated = { ...current, settledAmount: current.settledAmount + amount, amountDue: current.amountDue - amount, updatedAt: now() }; records.set(id, updated); return updated; },
  } as unknown as SalesDebitNoteRepository;
}

function fakeAccounting(options: { missingSettings?: boolean; inactiveBank?: boolean; closedYear?: boolean } = {}) {
  const account = (id: string): AccountRecord => ({ id, tenantId: context.tenantId, accountCode: id, accountName: id, accountType: "ASSET", normalBalance: "DEBIT", isControlAccount: false, isCashAccount: id === ids.bank, isBankAccount: id === ids.bank, isSystem: false, isActive: !(options.inactiveBank && id === ids.bank), openingBalance: 0, openingBalanceType: "DEBIT", createdAt: now(), updatedAt: now() });
  const settings: AccountingSettingsRecord = { id: "settings", tenantId: context.tenantId, accountsReceivableAccountId: ids.ar, salesIncomeAccountId: "income", createdAt: now(), updatedAt: now() };
  let draft: JournalEntryRecord | undefined;
  return {
    async getAccountingSettings() { return options.missingSettings ? undefined : settings; },
    async getAccountById(_tenantId: string, id: string) { return account(id); },
    async resolveOpenFiscalYearForDate() { if (options.closedYear) throw new Error("Open fiscal year was not found"); return { id: ids.fy, tenantId: context.tenantId, name: "FY", startDate: "2026-04-01", endDate: "2027-03-31", status: "OPEN", isDefault: true, createdAt: now(), updatedAt: now() } satisfies FiscalYearRecord; },
    async createJournalEntry(input: { lines: JournalEntryRecord["lines"]; journalDate?: string; postingDate?: string; fiscalYearId: string; referenceType?: string; referenceId?: string; sourceModule?: string; narration?: string }) {
      const totalDebit = input.lines.reduce((sum, line) => sum + (line.debitAmount ?? 0), 0);
      const totalCredit = input.lines.reduce((sum, line) => sum + (line.creditAmount ?? 0), 0);
      draft = { id: "je-refund", tenantId: context.tenantId, journalNumber: "JE-REF", journalDate: input.journalDate ?? "2026-06-21", postingDate: input.postingDate, fiscalYearId: input.fiscalYearId, referenceType: input.referenceType, referenceId: input.referenceId, sourceModule: input.sourceModule, status: "DRAFT", narration: input.narration, totalDebit, totalCredit, createdAt: now(), updatedAt: now(), lines: input.lines.map((line, index) => ({ id: `jl-${index}`, journalEntryId: "je-refund", lineNumber: index + 1, accountId: line.accountId, partyId: line.partyId, customerId: line.customerId, debitAmount: line.debitAmount ?? 0, creditAmount: line.creditAmount ?? 0, narration: line.narration, createdAt: now(), updatedAt: now() })) };
      return draft;
    },
    async postJournalEntry() { return { ...draft!, status: "POSTED", postedAt: now() }; },
  };
}

function fakeRefundRepo(): CustomerRefundRepository {
  const records = new Map<string, CustomerRefundRecord>();
  const active = (tenantId: string) => [...records.values()].filter((record) => record.tenantId === tenantId && !record.deletedAt);
  return {
    async createCustomerRefund(input: CustomerRefundCreateInput, allocations) { const id = `refund-${records.size + 1}`; const refund = { id, tenantId: input.tenantId, refundNumber: input.refundNumber ?? `REF-${records.size + 1}`, customerId: input.customerId, partyId: input.partyId, refundDate: input.refundDate ?? "2026-06-21", postingDate: input.postingDate, status: "DRAFT" as CustomerRefundStatus, paymentMethod: input.paymentMethod, depositAccountId: input.depositAccountId, totalAmount: input.totalAmount, referenceNumber: input.referenceNumber, notes: input.notes, createdAt: now(), updatedAt: now(), allocations: allocations.map((allocation) => ({ ...allocation, refundId: id })) }; records.set(id, refund); return refund; },
    async listCustomerRefunds(request) { const rows = active(request.tenantId); return { rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 }; },
    async getCustomerRefundById(tenantId, id) { return active(tenantId).find((refund) => refund.id === id); },
    async getCustomerRefundByNumber(tenantId, refundNumber) { return active(tenantId).find((refund) => refund.refundNumber === refundNumber); },
    async updateCustomerRefund(tenantId, id, input: CustomerRefundUpdateInput, allocations) { const current = await this.getCustomerRefundById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const updated = { ...current, ...input, allocations: allocations?.map((allocation) => ({ ...allocation, refundId: id })) ?? current.allocations, updatedAt: now() }; records.set(id, updated); return updated; },
    async softDeleteCustomerRefund(tenantId, id) { const current = await this.getCustomerRefundById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const deleted = { ...current, deletedAt: now() }; records.set(id, deleted); return deleted; },
    async postCustomerRefund(tenantId, id, journalEntryId) { const current = await this.getCustomerRefundById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const posted = { ...current, status: "POSTED" as CustomerRefundStatus, journalEntryId, postedAt: now() }; records.set(id, posted); return posted; },
    async cancelDraftCustomerRefund(tenantId, id) { const current = await this.getCustomerRefundById(tenantId, id); if (!current || current.status !== "DRAFT") return undefined; const cancelled = { ...current, status: "CANCELLED" as CustomerRefundStatus, cancelledAt: now() }; records.set(id, cancelled); return cancelled; },
    async getCustomerRefundAllocations(tenantId, id) { return (await this.getCustomerRefundById(tenantId, id))?.allocations ?? []; },
    async getCustomerRefundsByCreditNote(tenantId, creditNoteId) { return active(tenantId).filter((refund) => refund.allocations.some((allocation) => allocation.creditNoteId === creditNoteId)); },
    async getCustomerRefundStats(tenantId) { const rows = active(tenantId); return { total: rows.length, draftValue: rows.filter((row) => row.status === "DRAFT").reduce((sum, row) => sum + row.totalAmount, 0), postedValue: rows.filter((row) => row.status === "POSTED").reduce((sum, row) => sum + row.totalAmount, 0), cancelledValue: 0, refundedValue: 0, byStatus: { DRAFT: { count: 0, value: 0 }, POSTED: { count: 0, value: 0 }, CANCELLED: { count: 0, value: 0 } } }; },
  };
}

function fakeAllocationRepo(): CreditNoteAllocationRepository {
  const rows: CreditNoteAllocationRecord[] = [];
  return {
    async createCreditNoteAllocation(input: CreditNoteAllocationCreateInput & { customerId: string }) { const row: CreditNoteAllocationRecord = { id: `allocation-${rows.length + 1}`, tenantId: input.tenantId, companyId: input.companyId, branchId: input.branchId, creditNoteId: input.creditNoteId, targetType: input.targetType, targetId: input.targetId, customerId: input.customerId, allocationDate: input.allocationDate ?? "2026-06-21", amount: input.amount, notes: input.notes, createdAt: now(), updatedAt: now() }; rows.push(row); return row; },
    async listCreditNoteAllocations(request) { return { rows: rows.filter((row) => !request.creditNoteId || row.creditNoteId === request.creditNoteId), total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 }; },
    async getCreditNoteAllocations(_tenantId, creditNoteId) { return rows.filter((row) => row.creditNoteId === creditNoteId); },
    async getInvoiceCreditAllocations(_tenantId, invoiceId) { return rows.filter((row) => row.targetType === "SALES_INVOICE" && row.targetId === invoiceId); },
    async getDebitNoteCreditAllocations(_tenantId, debitNoteId) { return rows.filter((row) => row.targetType === "SALES_DEBIT_NOTE" && row.targetId === debitNoteId); },
  };
}

let server: Server | undefined;
afterEach(async () => { await new Promise<void>((resolve, reject) => { if (!server) return resolve(); server.close((error) => error ? reject(error) : resolve()); server = undefined; }); });

describe("customer refunds and credit allocations", () => {
  it("creates and posts customer refund from available credit", async () => {
    const service = createCustomerRefundsService(fakeRefundRepo(), fakeMasterData(), fakeCreditNotes(), fakeAccounting() as never);
    const refund = await service.create({ tenantId: context.tenantId, customerId: ids.customer, paymentMethod: "BANK_TRANSFER", depositAccountId: ids.bank, totalAmount: 50, allocations: [{ creditNoteId: ids.creditNote, amount: 50 }] }, context);
    const posted = await service.post(context.tenantId, refund.id, {}, context);
    expect(posted.journalEntry.totalDebit).toBe(50);
    expect(posted.journalEntry.totalCredit).toBe(50);
    expect(posted.refund.status).toBe("POSTED");
  });

  it("blocks draft credit notes, over-refunds, inactive refund accounts, and closed fiscal years", async () => {
    await expect(createCustomerRefundsService(fakeRefundRepo(), fakeMasterData(), fakeCreditNotes(creditNote({ status: "DRAFT" })), fakeAccounting() as never).create({ tenantId: context.tenantId, customerId: ids.customer, paymentMethod: "BANK_TRANSFER", depositAccountId: ids.bank, totalAmount: 50, allocations: [{ creditNoteId: ids.creditNote, amount: 50 }] }, context)).rejects.toThrow(/POSTED/);
    await expect(createCustomerRefundsService(fakeRefundRepo(), fakeMasterData(), fakeCreditNotes(), fakeAccounting() as never).create({ tenantId: context.tenantId, customerId: ids.customer, paymentMethod: "BANK_TRANSFER", depositAccountId: ids.bank, totalAmount: 150, allocations: [{ creditNoteId: ids.creditNote, amount: 150 }] }, context)).rejects.toThrow(/available/);
    const inactive = createCustomerRefundsService(fakeRefundRepo(), fakeMasterData(), fakeCreditNotes(), fakeAccounting({ inactiveBank: true }) as never);
    await expect(inactive.post(context.tenantId, (await inactive.create({ tenantId: context.tenantId, customerId: ids.customer, paymentMethod: "BANK_TRANSFER", depositAccountId: ids.bank, totalAmount: 10, allocations: [{ creditNoteId: ids.creditNote, amount: 10 }] }, context)).id, {}, context)).rejects.toThrow(/active/);
    const closed = createCustomerRefundsService(fakeRefundRepo(), fakeMasterData(), fakeCreditNotes(), fakeAccounting({ closedYear: true }) as never);
    await expect(closed.post(context.tenantId, (await closed.create({ tenantId: context.tenantId, customerId: ids.customer, paymentMethod: "BANK_TRANSFER", depositAccountId: ids.bank, totalAmount: 10, allocations: [{ creditNoteId: ids.creditNote, amount: 10 }] }, context)).id, {}, context)).rejects.toThrow(/Open fiscal year/);
  });

  it("allocates credit notes to invoices and debit notes", async () => {
    const service = createCreditNoteAllocationsService(fakeAllocationRepo(), fakeCreditNotes(), fakeInvoices(), fakeDebitNotes());
    const invoiceAllocation = await service.allocate({ tenantId: context.tenantId, creditNoteId: ids.creditNote, targetType: "SALES_INVOICE", targetId: ids.invoice, amount: 40 }, context);
    expect(invoiceAllocation.amount).toBe(40);
    const debitAllocation = await service.allocate({ tenantId: context.tenantId, creditNoteId: ids.creditNote, targetType: "SALES_DEBIT_NOTE", targetId: ids.debitNote, amount: 30 }, context);
    expect(debitAllocation.amount).toBe(30);
    await expect(service.allocate({ tenantId: context.tenantId, creditNoteId: ids.creditNote, targetType: "SALES_INVOICE", targetId: ids.invoice, amount: 100 }, context)).rejects.toThrow(/available/);
  });

  it("serves customer refund API routes", async () => {
    const service = createCustomerRefundsService(fakeRefundRepo(), fakeMasterData(), fakeCreditNotes(), fakeAccounting() as never);
    server = createApiService({ customerRefunds: service });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const port = (server.address() as { port: number }).port;
    const request = async (path: string, init?: RequestInit) => fetch(`http://127.0.0.1:${port}${path}`, { ...init, headers: { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*", ...(init?.headers ?? {}) } });
    const created = await request("/api/finance/customer-refunds", { method: "POST", body: JSON.stringify({ customerId: ids.customer, paymentMethod: "BANK_TRANSFER", depositAccountId: ids.bank, totalAmount: 20, allocations: [{ creditNoteId: ids.creditNote, amount: 20 }] }) });
    expect(created.status).toBe(201);
    const refund = await created.json() as CustomerRefundRecord;
    expect((await request("/api/finance/customer-refunds")).status).toBe(200);
    expect((await request("/api/finance/customer-refunds/stats")).status).toBe(200);
    expect((await request(`/api/finance/customer-refunds/${refund.id}`)).status).toBe(200);
    expect((await request(`/api/finance/customer-refunds/${refund.id}/allocations`)).status).toBe(200);
    expect((await request(`/api/finance/customer-refunds/${refund.id}/post`, { method: "POST", body: JSON.stringify({}) })).status).toBe(200);
  });
});

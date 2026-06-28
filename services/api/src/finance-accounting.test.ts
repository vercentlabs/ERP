import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import { createAccountingService } from "../../../modules/finance/accounting/service";
import type { AccountCreateInput, AccountGroupCreateInput, AccountGroupRecord, AccountListRequest, AccountRecord, AccountingRepository, AccountingSettingsRecord, AccountingSettingsUpdateInput, FiscalYearCreateInput, FiscalYearListRequest, FiscalYearRecord, JournalEntryCreateInput, JournalEntryLineRecord, JournalEntryListRequest, JournalEntryRecord, JournalEntryUpdateInput, TrialBalanceRequest } from "../../../modules/finance/accounting/types";
import { createApiService } from "./index";

const context = { tenantId: "tenant-a", actorId: "user-a", roles: ["admin"], permissions: ["*"] };
const now = () => new Date().toISOString();
let seq = 1000;
const id = () => `00000000-0000-4000-8000-00000000${seq++}`;

function fakeAccountingRepository(): AccountingRepository {
  const groups = new Map<string, AccountGroupRecord>();
  const accounts = new Map<string, AccountRecord>();
  const years = new Map<string, FiscalYearRecord>();
  const journals = new Map<string, JournalEntryRecord>();
  let settings: AccountingSettingsRecord | undefined;
  const activeAccounts = (tenantId: string) => [...accounts.values()].filter((row) => row.tenantId === tenantId && !row.deletedAt);
  const activeJournals = (tenantId: string) => [...journals.values()].filter((row) => row.tenantId === tenantId && !row.deletedAt);
  return {
    async createAccountGroup(input: AccountGroupCreateInput) { const row: AccountGroupRecord = { id: id(), tenantId: input.tenantId, name: input.name, code: input.code, type: input.type, isSystem: input.isSystem ?? false, isActive: input.isActive ?? true, createdAt: now(), updatedAt: now() }; groups.set(row.id, row); return row; },
    async listAccountGroups(request: AccountListRequest) { const rows = [...groups.values()].filter((row) => row.tenantId === request.tenantId); return { rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 }; },
    async createAccount(input: AccountCreateInput) { const normalBalance = input.normalBalance ?? (["ASSET", "EXPENSE"].includes(input.accountType) ? "DEBIT" : "CREDIT"); const row: AccountRecord = { id: id(), tenantId: input.tenantId, accountCode: input.accountCode, accountName: input.accountName, accountType: input.accountType, normalBalance, isControlAccount: false, isCashAccount: false, isBankAccount: false, isSystem: false, isActive: input.isActive ?? true, openingBalance: input.openingBalance ?? 0, openingBalanceType: input.openingBalanceType ?? normalBalance, createdAt: now(), updatedAt: now() }; accounts.set(row.id, row); return row; },
    async listAccounts(request: AccountListRequest) { let rows = activeAccounts(request.tenantId); if (request.type) rows = rows.filter((row) => row.accountType === request.type); if (request.isActive !== undefined) rows = rows.filter((row) => row.isActive === request.isActive); if (request.search) rows = rows.filter((row) => row.accountCode.includes(request.search!) || row.accountName.includes(request.search!)); return { rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 }; },
    async getAccountById(tenantId: string, accountId: string) { return activeAccounts(tenantId).find((row) => row.id === accountId); },
    async getAccountByCode(tenantId: string, accountCode: string) { return activeAccounts(tenantId).find((row) => row.accountCode === accountCode); },
    async updateAccount(tenantId: string, accountId: string, input) { const current = await this.getAccountById(tenantId, accountId); if (!current) return undefined; const updated = { ...current, ...input, updatedAt: now() }; accounts.set(accountId, updated); return updated; },
    async softDeleteAccount(tenantId: string, accountId: string) { const current = await this.getAccountById(tenantId, accountId); if (!current) return undefined; const deleted = { ...current, deletedAt: now() }; accounts.set(accountId, deleted); return deleted; },
    async createFiscalYear(input: FiscalYearCreateInput) { if (input.isDefault) for (const year of years.values()) if (year.tenantId === input.tenantId) years.set(year.id, { ...year, isDefault: false }); const row: FiscalYearRecord = { id: id(), tenantId: input.tenantId, name: input.name, startDate: input.startDate, endDate: input.endDate, status: "OPEN", isDefault: input.isDefault ?? false, createdAt: now(), updatedAt: now() }; years.set(row.id, row); return row; },
    async listFiscalYears(request: FiscalYearListRequest) { let rows = [...years.values()].filter((row) => row.tenantId === request.tenantId); if (request.status) rows = rows.filter((row) => row.status === request.status); return { rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 }; },
    async getFiscalYearById(tenantId: string, yearId: string) { return [...years.values()].find((row) => row.tenantId === tenantId && row.id === yearId); },
    async resolveOpenFiscalYearForDate(tenantId: string, date: string) { return [...years.values()].find((row) => row.tenantId === tenantId && row.status === "OPEN" && row.startDate <= date && row.endDate >= date); },
    async setDefaultFiscalYear(tenantId: string, yearId: string) { const current = await this.getFiscalYearById(tenantId, yearId); if (!current) return undefined; for (const year of years.values()) if (year.tenantId === tenantId) years.set(year.id, { ...year, isDefault: false }); const updated = { ...current, isDefault: true, updatedAt: now() }; years.set(yearId, updated); return updated; },
    async closeFiscalYear(tenantId: string, yearId: string) { const current = await this.getFiscalYearById(tenantId, yearId); if (!current) return undefined; const closed: FiscalYearRecord = { ...current, status: "CLOSED", isDefault: false, closedAt: now(), updatedAt: now() }; years.set(yearId, closed); return closed; },
    async createJournalEntry(input: JournalEntryCreateInput, lines: JournalEntryLineRecord[], totals) { const row: JournalEntryRecord = { id: id(), tenantId: input.tenantId, journalNumber: input.journalNumber ?? `JE-${journals.size + 1}`, journalDate: input.journalDate ?? "2026-06-21", fiscalYearId: input.fiscalYearId, status: "DRAFT", narration: input.narration, totalDebit: totals.totalDebit, totalCredit: totals.totalCredit, createdAt: now(), updatedAt: now(), lines: lines.map((line) => ({ ...line, journalEntryId: "" })) }; row.lines = row.lines.map((line) => ({ ...line, journalEntryId: row.id })); journals.set(row.id, row); return row; },
    async listJournalEntries(request: JournalEntryListRequest) { let rows = activeJournals(request.tenantId); if (request.status) rows = rows.filter((row) => row.status === request.status); return { rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 }; },
    async getJournalEntryById(tenantId: string, journalId: string) { return activeJournals(tenantId).find((row) => row.id === journalId); },
    async updateJournalEntry(tenantId: string, journalId: string, input: JournalEntryUpdateInput, lines, totals) { const current = await this.getJournalEntryById(tenantId, journalId); if (!current || current.status !== "DRAFT") return undefined; const updated = { ...current, ...input, lines: lines?.map((line) => ({ ...line, journalEntryId: journalId })) ?? current.lines, totalDebit: totals?.totalDebit ?? current.totalDebit, totalCredit: totals?.totalCredit ?? current.totalCredit, updatedAt: now() }; journals.set(journalId, updated); return updated; },
    async softDeleteJournalEntry(tenantId: string, journalId: string) { const current = await this.getJournalEntryById(tenantId, journalId); if (!current || current.status !== "DRAFT") return undefined; const deleted = { ...current, deletedAt: now() }; journals.set(journalId, deleted); return deleted; },
    async postJournalEntry(tenantId: string, journalId: string) { const current = await this.getJournalEntryById(tenantId, journalId); if (!current || current.status !== "DRAFT") return undefined; const posted: JournalEntryRecord = { ...current, status: "POSTED", postingDate: current.journalDate, postedAt: now(), updatedAt: now() }; journals.set(journalId, posted); return posted; },
    async cancelDraftJournalEntry(tenantId: string, journalId: string) { const current = await this.getJournalEntryById(tenantId, journalId); if (!current || current.status !== "DRAFT") return undefined; const cancelled: JournalEntryRecord = { ...current, status: "CANCELLED", cancelledAt: now() }; journals.set(journalId, cancelled); return cancelled; },
    async getJournalEntryLines(tenantId: string, journalId: string) { return (await this.getJournalEntryById(tenantId, journalId))?.lines ?? []; },
    async getTrialBalance(request: TrialBalanceRequest) { const posted = activeJournals(request.tenantId).filter((row) => row.status === "POSTED"); return activeAccounts(request.tenantId).map((account) => { const lines = posted.flatMap((journal) => journal.lines).filter((line) => line.accountId === account.id); const debit = lines.reduce((sum, line) => sum + line.debitAmount, 0); const credit = lines.reduce((sum, line) => sum + line.creditAmount, 0); return { accountId: account.id, accountCode: account.accountCode, accountName: account.accountName, accountType: account.accountType, normalBalance: account.normalBalance, debit, credit, netBalance: account.normalBalance === "DEBIT" ? debit - credit : credit - debit }; }).filter((row) => row.debit || row.credit); },
    async getAccountingSettings() { return settings; },
    async updateAccountingSettings(input: AccountingSettingsUpdateInput) { settings = { id: settings?.id ?? id(), tenantId: input.tenantId, accountsReceivableAccountId: input.accountsReceivableAccountId, salesIncomeAccountId: input.salesIncomeAccountId, salesTaxPayableAccountId: input.salesTaxPayableAccountId, roundingAdjustmentAccountId: input.roundingAdjustmentAccountId, createdAt: settings?.createdAt ?? now(), updatedAt: now() }; return settings; },
  };
}

const journalInput = (yearId: string, debitAccountId: string, creditAccountId: string) => ({ tenantId: context.tenantId, fiscalYearId: yearId, journalDate: "2026-06-21", narration: "Opening journal", lines: [{ accountId: debitAccountId, debitAmount: 100 }, { accountId: creditAccountId, creditAmount: 100 }] });
let server: Server | undefined;
afterEach(async () => { await new Promise<void>((resolve, reject) => { if (!server) return resolve(); server.close((error) => error ? reject(error) : resolve()); server = undefined; }); });

describe("finance accounting foundation", () => {
  it("creates accounts, rejects duplicate account codes, and blocks inactive account posting", async () => {
    const service = createAccountingService(fakeAccountingRepository());
    const cash = await service.createAccount({ tenantId: context.tenantId, accountCode: "1000", accountName: "Cash", accountType: "ASSET" }, context);
    await expect(service.createAccount({ tenantId: context.tenantId, accountCode: "1000", accountName: "Cash Duplicate", accountType: "ASSET" }, context)).rejects.toThrow(/already exists/);
    const inactive = await service.createAccount({ tenantId: context.tenantId, accountCode: "9999", accountName: "Inactive", accountType: "EXPENSE", isActive: false }, context);
    const year = await service.createFiscalYear({ tenantId: context.tenantId, name: "FY", startDate: "2026-04-01", endDate: "2027-03-31" }, context);
    await expect(service.createJournalEntry(journalInput(year.id, cash.id, inactive.id), context)).rejects.toThrow(/Inactive accounts/);
  });

  it("handles fiscal years, balanced journals, posting immutability, soft delete, and trial balance", async () => {
    const service = createAccountingService(fakeAccountingRepository());
    const cash = await service.createAccount({ tenantId: context.tenantId, accountCode: "1000", accountName: "Cash", accountType: "ASSET" }, context);
    const revenue = await service.createAccount({ tenantId: context.tenantId, accountCode: "4000", accountName: "Revenue", accountType: "INCOME" }, context);
    expect((await service.updateAccountingSettings({ tenantId: context.tenantId, accountsReceivableAccountId: cash.id, salesIncomeAccountId: revenue.id }, context)).salesIncomeAccountId).toBe(revenue.id);
    const year = await service.createFiscalYear({ tenantId: context.tenantId, name: "FY", startDate: "2026-04-01", endDate: "2027-03-31", isDefault: true }, context);
    expect((await service.setDefaultFiscalYear(context.tenantId, year.id, context)).isDefault).toBe(true);
    await expect(service.createJournalEntry({ ...journalInput(year.id, cash.id, revenue.id), lines: [{ accountId: cash.id, debitAmount: 100 }, { accountId: revenue.id, creditAmount: 90 }] }, context)).rejects.toThrow(/balance/);
    await expect(service.createJournalEntry({ ...journalInput(year.id, cash.id, revenue.id), lines: [{ accountId: cash.id, debitAmount: 100 }] }, context)).rejects.toThrow();
    const draft = await service.createJournalEntry(journalInput(year.id, cash.id, revenue.id), context);
    const posted = await service.postJournalEntry(context.tenantId, draft.id, context);
    expect(posted.status).toBe("POSTED");
    await expect(service.updateJournalEntry(context.tenantId, posted.id, { narration: "No" }, context)).rejects.toThrow(/DRAFT/);
    await expect(service.softDeleteJournalEntry(context.tenantId, posted.id, context)).rejects.toThrow(/DRAFT/);
    const trial = await service.getTrialBalance({ tenantId: context.tenantId }, context);
    expect(trial).toHaveLength(2);
    const draftDelete = await service.createJournalEntry(journalInput(year.id, cash.id, revenue.id), context);
    expect((await service.softDeleteJournalEntry(context.tenantId, draftDelete.id, context)).deletedAt).toBeTruthy();
    await service.closeFiscalYear(context.tenantId, year.id, context);
    const closedDraft = await service.createFiscalYear({ tenantId: context.tenantId, name: "Closed", startDate: "2025-04-01", endDate: "2026-03-31" }, context);
    await service.closeFiscalYear(context.tenantId, closedDraft.id, context);
    await expect(service.createJournalEntry(journalInput(closedDraft.id, cash.id, revenue.id), context)).rejects.toThrow(/OPEN/);
  });

  it("serves all finance accounting API routes", async () => {
    const service = createAccountingService(fakeAccountingRepository());
    server = createApiService({ accounting: service });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const address = server.address();
    const base = `http://127.0.0.1:${typeof address === "object" && address ? address.port : 0}`;
    const req = async (path: string, init?: RequestInit) => fetch(`${base}${path}`, { ...init, headers: { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*", ...(init?.headers ?? {}) } });
    expect((await req("/api/finance/account-groups", { method: "POST", body: JSON.stringify({ name: "Assets", code: "AST", type: "ASSET" }) })).status).toBe(201);
    const cash = await (await req("/api/finance/accounts", { method: "POST", body: JSON.stringify({ accountCode: "1000", accountName: "Cash", accountType: "ASSET" }) })).json() as AccountRecord;
    const revenue = await (await req("/api/finance/accounts", { method: "POST", body: JSON.stringify({ accountCode: "4000", accountName: "Revenue", accountType: "INCOME" }) })).json() as AccountRecord;
    expect((await req(`/api/finance/accounts/${cash.id}`, { method: "PATCH", body: JSON.stringify({ accountName: "Main Cash" }) })).status).toBe(200);
    expect((await req(`/api/finance/accounts/${cash.id}`)).status).toBe(200);
    expect((await req("/api/finance/accounts?type=ASSET")).status).toBe(200);
    const year = await (await req("/api/finance/fiscal-years", { method: "POST", body: JSON.stringify({ name: "FY", startDate: "2026-04-01", endDate: "2027-03-31" }) })).json() as FiscalYearRecord;
    expect((await req("/api/finance/accounting/settings", { method: "PATCH", body: JSON.stringify({ accountsReceivableAccountId: cash.id, salesIncomeAccountId: revenue.id }) })).status).toBe(200);
    expect((await req("/api/finance/accounting/settings")).status).toBe(200);
    expect((await req(`/api/finance/fiscal-years/${year.id}/default`, { method: "POST", body: "{}" })).status).toBe(200);
    const journal = await (await req("/api/finance/journal-entries", { method: "POST", body: JSON.stringify(journalInput(year.id, cash.id, revenue.id)) })).json() as JournalEntryRecord;
    expect((await req(`/api/finance/journal-entries/${journal.id}`)).status).toBe(200);
    expect((await req(`/api/finance/journal-entries/${journal.id}/lines`)).status).toBe(200);
    expect((await req(`/api/finance/journal-entries/${journal.id}`, { method: "PATCH", body: JSON.stringify({ narration: "Updated", lines: journalInput(year.id, cash.id, revenue.id).lines }) })).status).toBe(200);
    expect((await req(`/api/finance/journal-entries/${journal.id}/post`, { method: "POST", body: "{}" })).status).toBe(200);
    expect((await req("/api/finance/reports/trial-balance")).status).toBe(200);
    const draft = await (await req("/api/finance/journal-entries", { method: "POST", body: JSON.stringify(journalInput(year.id, cash.id, revenue.id)) })).json() as JournalEntryRecord;
    expect((await req(`/api/finance/journal-entries/${draft.id}/cancel`, { method: "POST", body: "{}" })).status).toBe(200);
    const deleteDraft = await (await req("/api/finance/journal-entries", { method: "POST", body: JSON.stringify(journalInput(year.id, cash.id, revenue.id)) })).json() as JournalEntryRecord;
    expect((await req(`/api/finance/journal-entries/${deleteDraft.id}`, { method: "DELETE" })).status).toBe(200);
    expect((await req(`/api/finance/fiscal-years/${year.id}/close`, { method: "POST", body: "{}" })).status).toBe(200);
  });
});

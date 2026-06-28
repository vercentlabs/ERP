import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import { createBankingService } from "../../../modules/finance/banking/service";
import type {
  BankAccountCreateInput, BankAccountListRequest, BankAccountRecord, BankAccountUpdateInput, BankReconciliationCreateInput,
  BankReconciliationLineRecord, BankReconciliationListRequest, BankReconciliationRecord, BankReconciliationUpdateInput, BankingRepository,
  CashBankLedgerRequest, CashBankLedgerRow, ReconciliationTotals, UnreconciledJournalLinesRequest,
} from "../../../modules/finance/banking/types";
import type { AccountRecord } from "../../../modules/finance/accounting/types";
import { createApiService } from "./index";

const context = { tenantId: "tenant-a", actorId: "user-a", roles: ["admin"], permissions: ["*"] };
const now = () => new Date().toISOString();
let seq = 2000;
const id = () => `00000000-0000-4000-8000-00000000${seq++}`;
const ids = { bankAccount: id(), cashAccount: id(), incomeAccount: id(), receiptJournal: id(), receiptLine: id(), refundJournal: id(), refundLine: id() };

function account(input: Partial<AccountRecord> = {}): AccountRecord {
  return { id: ids.cashAccount, tenantId: context.tenantId, accountCode: "1000", accountName: "Bank", accountType: "ASSET", normalBalance: "DEBIT", isControlAccount: false, isCashAccount: false, isBankAccount: true, isSystem: false, isActive: true, openingBalance: 0, openingBalanceType: "DEBIT", createdAt: now(), updatedAt: now(), ...input };
}
function fakeAccounting(options: { inactive?: boolean; nonBank?: boolean } = {}) {
  return { async getAccountById(_tenantId: string, accountId: string) { return account({ id: accountId, isActive: !options.inactive, isBankAccount: !options.nonBank, isCashAccount: false }); } };
}

function fakeBankingRepository(): BankingRepository {
  const bankAccounts = new Map<string, BankAccountRecord>();
  const reconciliations = new Map<string, BankReconciliationRecord>();
  const ledgerRows: CashBankLedgerRow[] = [
    { tenantId: context.tenantId, journalEntryId: ids.receiptJournal, journalEntryLineId: ids.receiptLine, journalNumber: "JE-RCPT", postingDate: "2026-06-21", journalDate: "2026-06-21", accountId: ids.cashAccount, accountCode: "1000", accountName: "Bank", referenceType: "CUSTOMER_RECEIPT", referenceId: "receipt", description: "Receipt", debitAmount: 100, creditAmount: 0, amount: 100, runningBalance: 100, isReconciled: false },
    { tenantId: context.tenantId, journalEntryId: ids.refundJournal, journalEntryLineId: ids.refundLine, journalNumber: "JE-RFND", postingDate: "2026-06-22", journalDate: "2026-06-22", accountId: ids.cashAccount, accountCode: "1000", accountName: "Bank", referenceType: "CUSTOMER_REFUND", referenceId: "refund", description: "Refund", debitAmount: 0, creditAmount: 25, amount: -25, runningBalance: 75, isReconciled: false },
  ];
  const withLines = (record: BankReconciliationRecord) => ({ ...record, lines: record.lines.map((line) => ({ ...line })) });
  const recalc = (record: BankReconciliationRecord): ReconciliationTotals => {
    const matchedAmount = record.lines.filter((line) => line.matchedJournalEntryLineId).reduce((sum, line) => sum + Math.abs(line.amount), 0);
    const unmatchedStatementAmount = record.lines.filter((line) => !line.matchedJournalEntryLineId).reduce((sum, line) => sum + Math.abs(line.amount), 0);
    return { systemOpeningBalance: record.systemOpeningBalance, systemClosingBalance: record.systemClosingBalance, matchedAmount, unmatchedStatementAmount, differenceAmount: record.closingStatementBalance - record.systemClosingBalance };
  };
  return {
    async createBankAccount(input: BankAccountCreateInput) { const record: BankAccountRecord = { id: ids.bankAccount, tenantId: input.tenantId, accountId: input.accountId, accountName: input.accountName, bankName: input.bankName, accountType: input.accountType, currency: input.currency ?? "INR", openingBalance: input.openingBalance ?? 0, status: input.status ?? "ACTIVE", isDefault: input.isDefault ?? false, notes: input.notes, createdAt: now(), updatedAt: now() }; if (record.isDefault) for (const row of bankAccounts.values()) row.isDefault = false; bankAccounts.set(record.id, record); return record; },
    async listBankAccounts(request: BankAccountListRequest) { let rows = [...bankAccounts.values()].filter((row) => row.tenantId === request.tenantId && !row.deletedAt); if (request.status) rows = rows.filter((row) => row.status === request.status); return { rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 }; },
    async getBankAccountById(tenantId: string, bankAccountId: string) { return [...bankAccounts.values()].find((row) => row.tenantId === tenantId && row.id === bankAccountId && !row.deletedAt); },
    async updateBankAccount(tenantId: string, bankAccountId: string, input: BankAccountUpdateInput) { const current = await this.getBankAccountById(tenantId, bankAccountId); if (!current) return undefined; const updated = { ...current, ...input, updatedAt: now() }; bankAccounts.set(bankAccountId, updated); return updated; },
    async softDeleteBankAccount(tenantId: string, bankAccountId: string) { const current = await this.getBankAccountById(tenantId, bankAccountId); if (!current) return undefined; const deleted = { ...current, deletedAt: now(), isDefault: false }; bankAccounts.set(bankAccountId, deleted); return deleted; },
    async setDefaultBankAccount(tenantId: string, bankAccountId: string) { const current = await this.getBankAccountById(tenantId, bankAccountId); if (!current || current.status !== "ACTIVE") return undefined; for (const row of bankAccounts.values()) if (row.tenantId === tenantId) row.isDefault = false; current.isDefault = true; return current; },
    async getCashBankLedger(request: CashBankLedgerRequest) { let rows = ledgerRows.filter((row) => row.tenantId === request.tenantId); if (request.referenceType) rows = rows.filter((row) => row.referenceType === request.referenceType); if (request.reconciled !== undefined) rows = rows.filter((row) => row.isReconciled === request.reconciled); return { rows, total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 }; },
    async getCashBankSummary(request: CashBankLedgerRequest) { const rows = (await this.getCashBankLedger(request)).rows; const totalDebit = rows.reduce((sum, row) => sum + row.debitAmount, 0); const totalCredit = rows.reduce((sum, row) => sum + row.creditAmount, 0); const unreconciled = rows.filter((row) => !row.isReconciled); return { bankAccountId: request.bankAccountId, openingBalance: 0, totalDebit, totalCredit, closingBalance: totalDebit - totalCredit, unreconciledAmount: unreconciled.reduce((sum, row) => sum + Math.abs(row.amount), 0), unreconciledCount: unreconciled.length }; },
    async createBankReconciliation(input: BankReconciliationCreateInput, lines: BankReconciliationLineRecord[], totals: ReconciliationTotals) { const record: BankReconciliationRecord = { id: id(), tenantId: input.tenantId, reconciliationNumber: input.reconciliationNumber ?? "BR-1", bankAccountId: input.bankAccountId, statementStartDate: input.statementStartDate, statementEndDate: input.statementEndDate, openingStatementBalance: input.openingStatementBalance ?? 0, closingStatementBalance: input.closingStatementBalance, status: "DRAFT", notes: input.notes, createdAt: now(), updatedAt: now(), lines: lines.map((line) => ({ ...line, reconciliationId: "" })), ...totals }; record.lines = record.lines.map((line) => ({ ...line, reconciliationId: record.id })); reconciliations.set(record.id, record); return withLines(record); },
    async listBankReconciliations(request: BankReconciliationListRequest) { let rows = [...reconciliations.values()].filter((row) => row.tenantId === request.tenantId && !row.deletedAt); if (request.status) rows = rows.filter((row) => row.status === request.status); return { rows: rows.map(withLines), total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 }; },
    async getBankReconciliationById(tenantId: string, reconciliationId: string) { const row = reconciliations.get(reconciliationId); return row?.tenantId === tenantId && !row.deletedAt ? withLines(row) : undefined; },
    async updateDraftBankReconciliation(tenantId: string, reconciliationId: string, input: BankReconciliationUpdateInput, lines?: BankReconciliationLineRecord[], totals?: ReconciliationTotals) { const current = reconciliations.get(reconciliationId); if (!current || current.tenantId !== tenantId || current.status !== "DRAFT") return undefined; const updated = { ...current, ...input, ...(totals ?? {}), lines: lines?.map((line) => ({ ...line, reconciliationId })) ?? current.lines, updatedAt: now() }; reconciliations.set(reconciliationId, updated); return withLines(updated); },
    async softDeleteDraftBankReconciliation(tenantId: string, reconciliationId: string) { const current = reconciliations.get(reconciliationId); if (!current || current.tenantId !== tenantId || current.status !== "DRAFT") return undefined; const deleted = { ...current, deletedAt: now() }; reconciliations.set(reconciliationId, deleted); return withLines(deleted); },
    async cancelDraftBankReconciliation(tenantId: string, reconciliationId: string) { const current = reconciliations.get(reconciliationId); if (!current || current.tenantId !== tenantId || current.status !== "DRAFT") return undefined; const cancelled = { ...current, status: "CANCELLED" as const, cancelledAt: now() }; reconciliations.set(reconciliationId, cancelled); return withLines(cancelled); },
    async completeBankReconciliation(tenantId: string, reconciliationId: string, totals: ReconciliationTotals) { const current = reconciliations.get(reconciliationId); if (!current || current.tenantId !== tenantId || current.status !== "DRAFT") return undefined; const completed = { ...current, ...totals, status: "COMPLETED" as const, completedAt: now() }; reconciliations.set(reconciliationId, completed); return withLines(completed); },
    async getBankReconciliationLines(tenantId: string, reconciliationId: string) { return (await this.getBankReconciliationById(tenantId, reconciliationId))?.lines ?? []; },
    async addBankReconciliationLine(tenantId: string, reconciliationId: string, line: BankReconciliationLineRecord) { const current = reconciliations.get(reconciliationId); if (!current || current.tenantId !== tenantId || current.status !== "DRAFT") return undefined; const saved = { ...line, reconciliationId }; current.lines.push(saved); return saved; },
    async replaceDraftBankReconciliationLines(tenantId: string, reconciliationId: string, lines: BankReconciliationLineRecord[]) { const current = reconciliations.get(reconciliationId); if (!current || current.tenantId !== tenantId || current.status !== "DRAFT") return []; current.lines = lines.map((line) => ({ ...line, reconciliationId })); return current.lines; },
    async matchBankStatementLine(tenantId: string, reconciliationId: string, lineId: string, journalEntryId: string, journalEntryLineId: string) { const current = reconciliations.get(reconciliationId); if (!current || current.tenantId !== tenantId) return undefined; const line = current.lines.find((candidate) => candidate.id === lineId); if (!line) return undefined; line.matchedJournalEntryId = journalEntryId; line.matchedJournalEntryLineId = journalEntryLineId; line.matchedAt = now(); const ledger = ledgerRows.find((row) => row.journalEntryLineId === journalEntryLineId); if (ledger) ledger.isReconciled = true; return { ...line }; },
    async unmatchBankStatementLine(tenantId: string, reconciliationId: string, lineId: string) { const current = reconciliations.get(reconciliationId); if (!current || current.tenantId !== tenantId) return undefined; const line = current.lines.find((candidate) => candidate.id === lineId); if (!line) return undefined; const matched = line.matchedJournalEntryLineId; line.matchedJournalEntryId = undefined; line.matchedJournalEntryLineId = undefined; line.matchedAt = undefined; const ledger = ledgerRows.find((row) => row.journalEntryLineId === matched); if (ledger) ledger.isReconciled = false; return { ...line }; },
    async getUnreconciledJournalLines(request: UnreconciledJournalLinesRequest) { return this.getCashBankLedger({ ...request, reconciled: false }); },
    async calculateReconciliationTotals(tenantId: string, reconciliationId: string) { const current = await this.getBankReconciliationById(tenantId, reconciliationId); return current ? recalc(current) : undefined; },
    async getBankReconciliationStats() { const rows = [...reconciliations.values()]; return { total: rows.length, draftCount: rows.filter((row) => row.status === "DRAFT").length, completedCount: rows.filter((row) => row.status === "COMPLETED").length, cancelledCount: rows.filter((row) => row.status === "CANCELLED").length, unreconciledAmount: rows.reduce((sum, row) => sum + row.unmatchedStatementAmount, 0), differenceAmount: rows.reduce((sum, row) => sum + Math.abs(row.differenceAmount), 0) }; },
  };
}

let server: Server | undefined;
afterEach(async () => { await new Promise<void>((resolve, reject) => { if (!server) return resolve(); server.close((error) => error ? reject(error) : resolve()); server = undefined; }); });

describe("finance banking service", () => {
  it("creates bank accounts only for active cash or bank finance accounts and sets default", async () => {
    const service = createBankingService(fakeBankingRepository(), fakeAccounting() as never);
    const created = await service.createBankAccount({ tenantId: context.tenantId, accountId: ids.cashAccount, accountName: "Operating Bank", accountType: "CURRENT", isDefault: true }, context);
    expect(created.isDefault).toBe(true);
    expect((await service.setDefaultBankAccount(context.tenantId, created.id, context)).isDefault).toBe(true);
    await expect(createBankingService(fakeBankingRepository(), fakeAccounting({ inactive: true }) as never).createBankAccount({ tenantId: context.tenantId, accountId: ids.cashAccount, accountName: "Inactive", accountType: "CURRENT" }, context)).rejects.toThrow("active");
    await expect(createBankingService(fakeBankingRepository(), fakeAccounting({ nonBank: true }) as never).createBankAccount({ tenantId: context.tenantId, accountId: ids.incomeAccount, accountName: "Revenue", accountType: "OTHER" }, context)).rejects.toThrow("cash or bank");
  });

  it("derives cash/bank ledger from posted receipt and refund journal lines", async () => {
    const service = createBankingService(fakeBankingRepository(), fakeAccounting() as never);
    await service.createBankAccount({ tenantId: context.tenantId, accountId: ids.cashAccount, accountName: "Operating Bank", accountType: "CURRENT" }, context);
    const receiptLedger = await service.getCashBankLedger({ tenantId: context.tenantId, referenceType: "CUSTOMER_RECEIPT" }, context);
    const refundLedger = await service.getCashBankLedger({ tenantId: context.tenantId, referenceType: "CUSTOMER_REFUND" }, context);
    expect(receiptLedger.rows[0].debitAmount).toBe(100);
    expect(refundLedger.rows[0].creditAmount).toBe(25);
    expect((await service.getCashBankSummary({ tenantId: context.tenantId }, context)).closingBalance).toBe(75);
  });

  it("matches, unmatches, completes, and locks reconciliations", async () => {
    const repo = fakeBankingRepository();
    const service = createBankingService(repo, fakeAccounting() as never);
    const bank = await service.createBankAccount({ tenantId: context.tenantId, accountId: ids.cashAccount, accountName: "Operating Bank", accountType: "CURRENT" }, context);
    const reconciliation = await service.createBankReconciliation({ tenantId: context.tenantId, bankAccountId: bank.id, statementStartDate: "2026-06-01", statementEndDate: "2026-06-30", closingStatementBalance: 75, lines: [{ transactionDate: "2026-06-21", description: "Receipt", debitAmount: 100 }, { transactionDate: "2026-06-22", description: "Refund", creditAmount: 25 }] }, context);
    const first = await service.matchBankStatementLine(context.tenantId, reconciliation.id, reconciliation.lines[0].id, { journalEntryLineId: ids.receiptLine }, context);
    expect(first.matchedJournalEntryLineId).toBe(ids.receiptLine);
    await expect(service.matchBankStatementLine(context.tenantId, reconciliation.id, reconciliation.lines[1].id, { journalEntryLineId: ids.receiptLine }, context)).rejects.toThrow("journal line");
    const unmatched = await service.unmatchBankStatementLine(context.tenantId, reconciliation.id, reconciliation.lines[0].id, context);
    expect(unmatched.matchedJournalEntryLineId).toBeUndefined();
    await service.matchBankStatementLine(context.tenantId, reconciliation.id, reconciliation.lines[0].id, { journalEntryLineId: ids.receiptLine }, context);
    await service.matchBankStatementLine(context.tenantId, reconciliation.id, reconciliation.lines[1].id, { journalEntryLineId: ids.refundLine }, context);
    const completed = await service.completeBankReconciliation(context.tenantId, reconciliation.id, {}, context);
    expect(completed.status).toBe("COMPLETED");
    await expect(service.updateDraftBankReconciliation(context.tenantId, reconciliation.id, { notes: "late" }, context)).rejects.toThrow("DRAFT");
  });
});

describe("finance banking API routes", () => {
  it("serves bank account, ledger, and reconciliation endpoints", async () => {
    const service = createBankingService(fakeBankingRepository(), fakeAccounting() as never);
    server = createApiService({ banking: service });
    await new Promise<void>((resolve) => server!.listen(0, resolve));
    const address = server.address(); const port = typeof address === "object" && address ? address.port : 0; const baseUrl = `http://127.0.0.1:${port}`; const headers = { "content-type": "application/json", "x-tenant-id": context.tenantId, "x-permissions": "*" };
    const bank = await fetch(`${baseUrl}/api/finance/bank-accounts`, { method: "POST", headers, body: JSON.stringify({ accountId: ids.cashAccount, accountName: "Operating Bank", accountType: "CURRENT" }) }).then((response) => response.json() as Promise<BankAccountRecord>);
    expect(await fetch(`${baseUrl}/api/finance/bank-accounts`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/bank-accounts/${bank.id}`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/bank-accounts/${bank.id}`, { method: "PATCH", headers, body: JSON.stringify({ notes: "updated" }) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/bank-accounts/${bank.id}/default`, { method: "POST", headers, body: "{}" }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/cash-bank-ledger`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/cash-bank-summary`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/bank-accounts/${bank.id}/ledger`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/bank-accounts/${bank.id}/unreconciled-lines`, { headers }).then((response) => response.status)).toBe(200);
    const reconciliation = await fetch(`${baseUrl}/api/finance/bank-reconciliations`, { method: "POST", headers, body: JSON.stringify({ bankAccountId: bank.id, statementStartDate: "2026-06-01", statementEndDate: "2026-06-30", closingStatementBalance: 75, lines: [{ transactionDate: "2026-06-21", description: "Receipt", debitAmount: 100 }] }) }).then((response) => response.json() as Promise<BankReconciliationRecord>);
    expect(await fetch(`${baseUrl}/api/finance/bank-reconciliations`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/bank-reconciliations/stats`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/bank-reconciliations/${reconciliation.id}`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/bank-reconciliations/${reconciliation.id}/lines`, { headers }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/bank-reconciliations/${reconciliation.id}/lines`, { method: "POST", headers, body: JSON.stringify({ transactionDate: "2026-06-22", description: "Refund", creditAmount: 25 }) }).then((response) => response.status)).toBe(201);
    expect(await fetch(`${baseUrl}/api/finance/bank-reconciliations/${reconciliation.id}/lines/${reconciliation.lines[0].id}/match`, { method: "POST", headers, body: JSON.stringify({ journalEntryLineId: ids.receiptLine }) }).then((response) => response.status)).toBe(200);
    expect(await fetch(`${baseUrl}/api/finance/bank-reconciliations/${reconciliation.id}/lines/${reconciliation.lines[0].id}/unmatch`, { method: "POST", headers, body: "{}" }).then((response) => response.status)).toBe(200);
    const cancellable = await fetch(`${baseUrl}/api/finance/bank-reconciliations`, { method: "POST", headers, body: JSON.stringify({ bankAccountId: bank.id, statementStartDate: "2026-06-01", statementEndDate: "2026-06-30", closingStatementBalance: 75 }) }).then((response) => response.json() as Promise<BankReconciliationRecord>);
    expect(await fetch(`${baseUrl}/api/finance/bank-reconciliations/${cancellable.id}/cancel`, { method: "POST", headers, body: "{}" }).then((response) => response.status)).toBe(200);
    const deletable = await fetch(`${baseUrl}/api/finance/bank-reconciliations`, { method: "POST", headers, body: JSON.stringify({ bankAccountId: bank.id, statementStartDate: "2026-06-01", statementEndDate: "2026-06-30", closingStatementBalance: 75 }) }).then((response) => response.json() as Promise<BankReconciliationRecord>);
    expect(await fetch(`${baseUrl}/api/finance/bank-reconciliations/${deletable.id}`, { method: "DELETE", headers }).then((response) => response.status)).toBe(200);
  });
});

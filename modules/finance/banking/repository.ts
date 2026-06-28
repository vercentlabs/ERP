import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
import type {
  BankAccountCreateInput, BankAccountListRequest, BankAccountRecord, BankAccountUpdateInput, BankReconciliationCreateInput,
  BankReconciliationLineRecord, BankReconciliationListRequest, BankReconciliationRecord, BankReconciliationStats,
  BankReconciliationUpdateInput, BankingRepository, CashBankLedgerRequest, CashBankLedgerRow, CashBankSummary, ReconciliationTotals,
  UnreconciledJournalLinesRequest,
} from "./types";

const bankAccountsTable = "finance_bank_accounts";
const reconciliationsTable = "finance_bank_reconciliations";
const reconciliationLinesTable = "finance_bank_reconciliation_lines";
const accountsTable = "finance_accounts";
const journalsTable = "finance_journal_entries";
const journalLinesTable = "finance_journal_entry_lines";

const toNullable = <T>(value: T | undefined | null) => value ?? null;
const toIso = (value: Date | string | null | undefined) => (!value ? undefined : value instanceof Date ? value.toISOString() : value);
const toDate = (value: Date | string | null | undefined) => toIso(value)?.slice(0, 10);
const money = (value: unknown) => Number(value ?? 0);
const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const numberWithPrefix = (prefix: string, explicit?: string) => explicit ?? `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;
const compact = (input: Record<string, unknown>) => Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));

type BankAccountRow = {
  id: string; tenant_id: string; company_id: string | null; branch_id: string | null; account_id: string; bank_name: string | null; account_name: string;
  account_number_last4: string | null; ifsc_code: string | null; branch_name: string | null; account_type: BankAccountRecord["accountType"]; currency: string;
  opening_balance: string | number; status: BankAccountRecord["status"]; is_default: boolean; notes: string | null; created_at: Date | string; updated_at: Date | string; deleted_at: Date | string | null;
};
type ReconciliationRow = {
  id: string; tenant_id: string; company_id: string | null; branch_id: string | null; reconciliation_number: string; bank_account_id: string; statement_start_date: Date | string;
  statement_end_date: Date | string; opening_statement_balance: string | number; closing_statement_balance: string | number; system_opening_balance: string | number;
  system_closing_balance: string | number; matched_amount: string | number; unmatched_statement_amount: string | number; difference_amount: string | number;
  status: BankReconciliationRecord["status"]; notes: string | null; completed_at: Date | string | null; cancelled_at: Date | string | null; created_at: Date | string; updated_at: Date | string; deleted_at: Date | string | null;
};
type ReconciliationLineRow = {
  id: string; tenant_id: string; reconciliation_id: string; transaction_date: Date | string; description: string; reference_number: string | null;
  debit_amount: string | number; credit_amount: string | number; amount: string | number; matched_journal_entry_id: string | null; matched_journal_entry_line_id: string | null;
  matched_at: Date | string | null; created_at: Date | string; updated_at: Date | string;
};

function mapBankAccount(row: BankAccountRow): BankAccountRecord {
  return {
    id: row.id, tenantId: row.tenant_id, companyId: row.company_id ?? undefined, branchId: row.branch_id ?? undefined, accountId: row.account_id,
    bankName: row.bank_name ?? undefined, accountName: row.account_name, accountNumberLast4: row.account_number_last4 ?? undefined, ifscCode: row.ifsc_code ?? undefined,
    branchName: row.branch_name ?? undefined, accountType: row.account_type, currency: row.currency, openingBalance: money(row.opening_balance), status: row.status,
    isDefault: row.is_default, notes: row.notes ?? undefined, createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)!, deletedAt: toIso(row.deleted_at),
  };
}
function mapLine(row: ReconciliationLineRow): BankReconciliationLineRecord {
  return {
    id: row.id, reconciliationId: row.reconciliation_id, transactionDate: toDate(row.transaction_date)!, description: row.description, referenceNumber: row.reference_number ?? undefined,
    debitAmount: money(row.debit_amount), creditAmount: money(row.credit_amount), amount: money(row.amount), matchedJournalEntryId: row.matched_journal_entry_id ?? undefined,
    matchedJournalEntryLineId: row.matched_journal_entry_line_id ?? undefined, matchedAt: toIso(row.matched_at), createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)!,
  };
}
function mapReconciliation(row: ReconciliationRow, lines: BankReconciliationLineRecord[] = []): BankReconciliationRecord {
  return {
    id: row.id, tenantId: row.tenant_id, companyId: row.company_id ?? undefined, branchId: row.branch_id ?? undefined, reconciliationNumber: row.reconciliation_number,
    bankAccountId: row.bank_account_id, statementStartDate: toDate(row.statement_start_date)!, statementEndDate: toDate(row.statement_end_date)!,
    openingStatementBalance: money(row.opening_statement_balance), closingStatementBalance: money(row.closing_statement_balance), systemOpeningBalance: money(row.system_opening_balance),
    systemClosingBalance: money(row.system_closing_balance), matchedAmount: money(row.matched_amount), unmatchedStatementAmount: money(row.unmatched_statement_amount),
    differenceAmount: money(row.difference_amount), status: row.status, notes: row.notes ?? undefined, completedAt: toIso(row.completed_at), cancelledAt: toIso(row.cancelled_at),
    createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)!, deletedAt: toIso(row.deleted_at), lines,
  };
}
function lineRecord(input: BankReconciliationLineRecord): Record<string, unknown> {
  return {
    id: input.id, tenant_id: undefined, reconciliation_id: input.reconciliationId, transaction_date: input.transactionDate, description: input.description,
    reference_number: toNullable(input.referenceNumber), debit_amount: input.debitAmount, credit_amount: input.creditAmount, amount: input.amount,
    matched_journal_entry_id: toNullable(input.matchedJournalEntryId), matched_journal_entry_line_id: toNullable(input.matchedJournalEntryLineId), matched_at: toNullable(input.matchedAt),
  };
}
function scope(query: Knex.QueryBuilder, request: { tenantId: string; companyId?: string; branchId?: string }) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}
async function attachLines(connection: Knex, rows: ReconciliationRow[]) {
  if (rows.length === 0) return [];
  const lineRows = await connection<ReconciliationLineRow>(reconciliationLinesTable).whereIn("reconciliation_id", rows.map((row) => row.id)).orderBy("transaction_date").orderBy("created_at");
  const grouped = new Map<string, BankReconciliationLineRecord[]>();
  for (const line of lineRows.map(mapLine)) grouped.set(line.reconciliationId, [...(grouped.get(line.reconciliationId) ?? []), line]);
  return rows.map((row) => mapReconciliation(row, grouped.get(row.id) ?? []));
}

export function createBankingRepository(database?: Knex): BankingRepository {
  const db = () => database ?? getTenantKnex();

  async function getBankAccountOpening(account: BankAccountRecord | undefined, tenantId: string, bankAccountId?: string) {
    if (account) return account.openingBalance;
    if (!bankAccountId) return 0;
    return money((await db()<BankAccountRow>(bankAccountsTable).where({ tenant_id: tenantId, id: bankAccountId }).first())?.opening_balance);
  }
  async function ledgerRows(request: CashBankLedgerRequest): Promise<CashBankLedgerRow[]> {
    const connection = db();
    const base = connection(`${journalLinesTable} as jel`)
      .join(`${journalsTable} as je`, "je.id", "jel.journal_entry_id")
      .join(`${accountsTable} as a`, "a.id", "jel.account_id")
      .leftJoin(`${reconciliationLinesTable} as brl`, "brl.matched_journal_entry_line_id", "jel.id")
      .leftJoin(`${reconciliationsTable} as br`, function joinReconciliation() {
        this.on("br.id", "=", "brl.reconciliation_id").andOnNull("br.deleted_at").andOnVal("br.status", "<>", "CANCELLED");
      })
      .where("je.tenant_id", request.tenantId)
      .where("je.status", "POSTED")
      .whereNull("je.deleted_at")
      .where((builder) => builder.where("a.is_cash_account", true).orWhere("a.is_bank_account", true))
      .select(
        "je.tenant_id", "je.company_id", "je.branch_id", "je.id as journal_entry_id", "jel.id as journal_entry_line_id", "je.journal_number",
        "je.posting_date", "je.journal_date", "a.id as account_id", "a.account_code", "a.account_name", "je.reference_type", "je.reference_id",
        "jel.narration", "jel.debit_amount", "jel.credit_amount", "br.id as reconciliation_id",
      )
      .orderBy("je.posting_date", "asc")
      .orderBy("je.journal_number", "asc");
    if (request.companyId) base.where("je.company_id", request.companyId);
    if (request.branchId) base.where("je.branch_id", request.branchId);
    if (request.accountId) base.where("jel.account_id", request.accountId);
    if (request.bankAccountId) {
      const bank = await connection<BankAccountRow>(bankAccountsTable).where({ tenant_id: request.tenantId, id: request.bankAccountId }).whereNull("deleted_at").first();
      if (!bank) return [];
      base.where("jel.account_id", bank.account_id);
    }
    if (request.dateFrom) base.where("je.posting_date", ">=", request.dateFrom);
    if (request.dateTo) base.where("je.posting_date", "<=", request.dateTo);
    if (request.referenceType) base.where("je.reference_type", request.referenceType);
    const rows = await base as unknown as Array<Record<string, unknown>>;
    let runningBalance = await getBankAccountOpening(undefined, request.tenantId, request.bankAccountId);
    const mapped = rows.map((row) => {
      const amount = roundMoney(money(row.debit_amount) - money(row.credit_amount));
      runningBalance = roundMoney(runningBalance + amount);
      return {
        tenantId: String(row.tenant_id), companyId: row.company_id ? String(row.company_id) : undefined, branchId: row.branch_id ? String(row.branch_id) : undefined,
        journalEntryId: String(row.journal_entry_id), journalEntryLineId: String(row.journal_entry_line_id), journalNumber: String(row.journal_number),
        postingDate: toDate(row.posting_date as never)!, journalDate: toDate(row.journal_date as never)!, accountId: String(row.account_id), accountCode: String(row.account_code),
        accountName: String(row.account_name), referenceType: row.reference_type ? String(row.reference_type) : undefined, referenceId: row.reference_id ? String(row.reference_id) : undefined,
        description: row.narration ? String(row.narration) : undefined, debitAmount: money(row.debit_amount), creditAmount: money(row.credit_amount), amount, runningBalance,
        isReconciled: Boolean(row.reconciliation_id), reconciliationId: row.reconciliation_id ? String(row.reconciliation_id) : undefined,
      } satisfies CashBankLedgerRow;
    });
    return request.reconciled === undefined ? mapped : mapped.filter((row) => row.isReconciled === request.reconciled);
  }
  async function systemBalance(tenantId: string, bankAccountId: string, date?: string) {
    const bank = await db()<BankAccountRow>(bankAccountsTable).where({ tenant_id: tenantId, id: bankAccountId }).whereNull("deleted_at").first();
    if (!bank) return 0;
    const query = db()(`${journalLinesTable} as jel`).join(`${journalsTable} as je`, "je.id", "jel.journal_entry_id").where("je.tenant_id", tenantId).where("je.status", "POSTED").whereNull("je.deleted_at").where("jel.account_id", bank.account_id);
    if (date) query.where("je.posting_date", "<=", date);
    const [row] = await query.sum({ debit: "jel.debit_amount" }).sum({ credit: "jel.credit_amount" }) as unknown as Array<{ debit?: string | number; credit?: string | number }>;
    return roundMoney(money(bank.opening_balance) + money(row?.debit) - money(row?.credit));
  }
  function totalsFrom(record: BankReconciliationRecord): ReconciliationTotals {
    const matchedAmount = roundMoney(record.lines.filter((line) => line.matchedJournalEntryLineId).reduce((sum, line) => sum + Math.abs(line.amount), 0));
    const unmatchedStatementAmount = roundMoney(record.lines.filter((line) => !line.matchedJournalEntryLineId).reduce((sum, line) => sum + Math.abs(line.amount), 0));
    const differenceAmount = roundMoney(record.closingStatementBalance - record.systemClosingBalance);
    return { systemOpeningBalance: record.systemOpeningBalance, systemClosingBalance: record.systemClosingBalance, matchedAmount, unmatchedStatementAmount, differenceAmount };
  }

  return {
    async createBankAccount(input) {
      return db().transaction(async (tx) => {
        if (input.isDefault) await tx<BankAccountRow>(bankAccountsTable).where({ tenant_id: input.tenantId }).modify((query) => { if (input.companyId) query.where("company_id", input.companyId); }).update({ is_default: false, updated_at: new Date() });
        const [row] = await tx<BankAccountRow>(bankAccountsTable).insert({ id: randomUUID(), tenant_id: input.tenantId, company_id: toNullable(input.companyId), branch_id: toNullable(input.branchId), account_id: input.accountId, bank_name: toNullable(input.bankName), account_name: input.accountName, account_number_last4: toNullable(input.accountNumberLast4), ifsc_code: toNullable(input.ifscCode), branch_name: toNullable(input.branchName), account_type: input.accountType, currency: input.currency ?? "INR", opening_balance: input.openingBalance ?? 0, status: input.status ?? "ACTIVE", is_default: input.isDefault ?? false, notes: toNullable(input.notes) }).returning("*");
        return mapBankAccount(row);
      });
    },
    async listBankAccounts(request) {
      const base = db()<BankAccountRow>(bankAccountsTable); scope(base, request).whereNull("deleted_at");
      if (request.status) base.where("status", request.status);
      if (request.accountType) base.where("account_type", request.accountType);
      if (request.search) base.andWhere((builder) => builder.whereILike("account_name", `%${request.search}%`).orWhereILike("bank_name", `%${request.search}%`));
      const [{ count }] = await base.clone().clearSelect().clearOrder().count<{ count: string }>({ count: "*" });
      const rows = await base.orderBy(request.sortBy ?? "created_at", request.sortDirection ?? "desc").limit(request.pageSize ?? 25).offset(((request.page ?? 1) - 1) * (request.pageSize ?? 25));
      return { rows: rows.map(mapBankAccount), total: Number(count), page: request.page ?? 1, pageSize: request.pageSize ?? 25 };
    },
    async getBankAccountById(tenantId, id) { const row = await db()<BankAccountRow>(bankAccountsTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first(); return row ? mapBankAccount(row) : undefined; },
    async updateBankAccount(tenantId, id, input) {
      const patch = compact({ company_id: input.companyId, branch_id: input.branchId, bank_name: input.bankName, account_name: input.accountName, account_number_last4: input.accountNumberLast4, ifsc_code: input.ifscCode, branch_name: input.branchName, account_type: input.accountType, currency: input.currency, opening_balance: input.openingBalance, status: input.status, is_default: input.isDefault, notes: input.notes, updated_at: new Date() });
      const [row] = await db()<BankAccountRow>(bankAccountsTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").update(patch).returning("*");
      return row ? mapBankAccount(row) : undefined;
    },
    async softDeleteBankAccount(tenantId, id) { const [row] = await db()<BankAccountRow>(bankAccountsTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").update({ deleted_at: new Date(), updated_at: new Date(), is_default: false }).returning("*"); return row ? mapBankAccount(row) : undefined; },
    async setDefaultBankAccount(tenantId, id) {
      return db().transaction(async (tx) => {
        const target = await tx<BankAccountRow>(bankAccountsTable).where({ tenant_id: tenantId, id, status: "ACTIVE" }).whereNull("deleted_at").first();
        if (!target) return undefined;
        await tx<BankAccountRow>(bankAccountsTable).where({ tenant_id: tenantId, company_id: target.company_id }).whereNull("deleted_at").update({ is_default: false, updated_at: new Date() });
        const [row] = await tx<BankAccountRow>(bankAccountsTable).where({ tenant_id: tenantId, id }).update({ is_default: true, updated_at: new Date() }).returning("*");
        return row ? mapBankAccount(row) : undefined;
      });
    },
    async getCashBankLedger(request) {
      const rows = await ledgerRows(request);
      return { rows: rows.slice(((request.page ?? 1) - 1) * (request.pageSize ?? 25), (request.page ?? 1) * (request.pageSize ?? 25)), total: rows.length, page: request.page ?? 1, pageSize: request.pageSize ?? 25 };
    },
    async getCashBankSummary(request) {
      const rows = await ledgerRows({ ...request, page: 1, pageSize: 100000 });
      const openingBalance = await getBankAccountOpening(undefined, request.tenantId, request.bankAccountId);
      const totalDebit = roundMoney(rows.reduce((sum, row) => sum + row.debitAmount, 0));
      const totalCredit = roundMoney(rows.reduce((sum, row) => sum + row.creditAmount, 0));
      const unreconciled = rows.filter((row) => !row.isReconciled);
      return { bankAccountId: request.bankAccountId, openingBalance, totalDebit, totalCredit, closingBalance: roundMoney(openingBalance + totalDebit - totalCredit), unreconciledAmount: roundMoney(unreconciled.reduce((sum, row) => sum + Math.abs(row.amount), 0)), unreconciledCount: unreconciled.length };
    },
    async createBankReconciliation(input, lines, totals) {
      return db().transaction(async (tx) => {
        const [row] = await tx<ReconciliationRow>(reconciliationsTable).insert({ id: randomUUID(), tenant_id: input.tenantId, company_id: toNullable(input.companyId), branch_id: toNullable(input.branchId), reconciliation_number: numberWithPrefix("BR", input.reconciliationNumber), bank_account_id: input.bankAccountId, statement_start_date: input.statementStartDate, statement_end_date: input.statementEndDate, opening_statement_balance: input.openingStatementBalance ?? 0, closing_statement_balance: input.closingStatementBalance, system_opening_balance: totals.systemOpeningBalance, system_closing_balance: totals.systemClosingBalance, matched_amount: totals.matchedAmount, unmatched_statement_amount: totals.unmatchedStatementAmount, difference_amount: totals.differenceAmount, notes: toNullable(input.notes) }).returning("*");
        if (lines.length) await tx<ReconciliationLineRow>(reconciliationLinesTable).insert(lines.map((line) => ({ ...lineRecord({ ...line, reconciliationId: row.id }), tenant_id: input.tenantId })));
        const savedLines = await tx<ReconciliationLineRow>(reconciliationLinesTable).where({ tenant_id: input.tenantId, reconciliation_id: row.id }).orderBy("transaction_date");
        return mapReconciliation(row, savedLines.map(mapLine));
      });
    },
    async listBankReconciliations(request) {
      const base = db()<ReconciliationRow>(reconciliationsTable); scope(base, request).whereNull("deleted_at");
      if (request.status) base.where("status", request.status);
      if (request.bankAccountId) base.where("bank_account_id", request.bankAccountId);
      if (request.dateFrom) base.where("statement_end_date", ">=", request.dateFrom);
      if (request.dateTo) base.where("statement_end_date", "<=", request.dateTo);
      if (request.search) base.whereILike("reconciliation_number", `%${request.search}%`);
      const [{ count }] = await base.clone().clearSelect().clearOrder().count<{ count: string }>({ count: "*" });
      const rows = await base.orderBy(request.sortBy ?? "created_at", request.sortDirection ?? "desc").limit(request.pageSize ?? 25).offset(((request.page ?? 1) - 1) * (request.pageSize ?? 25));
      return { rows: await attachLines(db(), rows), total: Number(count), page: request.page ?? 1, pageSize: request.pageSize ?? 25 };
    },
    async getBankReconciliationById(tenantId, id) { const row = await db()<ReconciliationRow>(reconciliationsTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first(); return row ? (await attachLines(db(), [row]))[0] : undefined; },
    async updateDraftBankReconciliation(tenantId, id, input, lines, totals) {
      return db().transaction(async (tx) => {
        const patch = compact({ company_id: input.companyId, branch_id: input.branchId, statement_start_date: input.statementStartDate, statement_end_date: input.statementEndDate, opening_statement_balance: input.openingStatementBalance, closing_statement_balance: input.closingStatementBalance, system_opening_balance: totals?.systemOpeningBalance, system_closing_balance: totals?.systemClosingBalance, matched_amount: totals?.matchedAmount, unmatched_statement_amount: totals?.unmatchedStatementAmount, difference_amount: totals?.differenceAmount, notes: input.notes, updated_at: new Date() });
        const [row] = await tx<ReconciliationRow>(reconciliationsTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update(patch).returning("*");
        if (!row) return undefined;
        if (lines) { await tx<ReconciliationLineRow>(reconciliationLinesTable).where({ tenant_id: tenantId, reconciliation_id: id }).delete(); await tx<ReconciliationLineRow>(reconciliationLinesTable).insert(lines.map((line) => ({ ...lineRecord({ ...line, reconciliationId: id }), tenant_id: tenantId }))); }
        return (await attachLines(tx, [row]))[0];
      });
    },
    async softDeleteDraftBankReconciliation(tenantId, id) { const [row] = await db()<ReconciliationRow>(reconciliationsTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ deleted_at: new Date(), updated_at: new Date() }).returning("*"); return row ? mapReconciliation(row) : undefined; },
    async cancelDraftBankReconciliation(tenantId, id) { const [row] = await db()<ReconciliationRow>(reconciliationsTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ status: "CANCELLED", cancelled_at: new Date(), updated_at: new Date() }).returning("*"); return row ? (await attachLines(db(), [row]))[0] : undefined; },
    async completeBankReconciliation(tenantId, id, totals) { const [row] = await db()<ReconciliationRow>(reconciliationsTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ status: "COMPLETED", completed_at: new Date(), updated_at: new Date(), ...{ system_opening_balance: totals.systemOpeningBalance, system_closing_balance: totals.systemClosingBalance, matched_amount: totals.matchedAmount, unmatched_statement_amount: totals.unmatchedStatementAmount, difference_amount: totals.differenceAmount } }).returning("*"); return row ? (await attachLines(db(), [row]))[0] : undefined; },
    async getBankReconciliationLines(tenantId, id) { return (await db()<ReconciliationLineRow>(reconciliationLinesTable).where({ tenant_id: tenantId, reconciliation_id: id }).orderBy("transaction_date")).map(mapLine); },
    async addBankReconciliationLine(tenantId, reconciliationId, line) {
      const current = await db()<ReconciliationRow>(reconciliationsTable).where({ tenant_id: tenantId, id: reconciliationId, status: "DRAFT" }).whereNull("deleted_at").first();
      if (!current) return undefined;
      const [row] = await db()<ReconciliationLineRow>(reconciliationLinesTable).insert({ ...lineRecord(line), tenant_id: tenantId, reconciliation_id: reconciliationId }).returning("*");
      return mapLine(row);
    },
    async replaceDraftBankReconciliationLines(tenantId, reconciliationId, lines) {
      return db().transaction(async (tx) => {
        const current = await tx<ReconciliationRow>(reconciliationsTable).where({ tenant_id: tenantId, id: reconciliationId, status: "DRAFT" }).whereNull("deleted_at").first();
        if (!current) return [];
        await tx<ReconciliationLineRow>(reconciliationLinesTable).where({ tenant_id: tenantId, reconciliation_id: reconciliationId }).delete();
        if (lines.length) await tx<ReconciliationLineRow>(reconciliationLinesTable).insert(lines.map((line) => ({ ...lineRecord({ ...line, reconciliationId }), tenant_id: tenantId })));
        return (await tx<ReconciliationLineRow>(reconciliationLinesTable).where({ tenant_id: tenantId, reconciliation_id: reconciliationId }).orderBy("transaction_date")).map(mapLine);
      });
    },
    async matchBankStatementLine(tenantId, reconciliationId, lineId, journalEntryId, journalEntryLineId) {
      const [row] = await db()<ReconciliationLineRow>(reconciliationLinesTable).where({ tenant_id: tenantId, reconciliation_id: reconciliationId, id: lineId }).update({ matched_journal_entry_id: journalEntryId, matched_journal_entry_line_id: journalEntryLineId, matched_at: new Date(), updated_at: new Date() }).returning("*");
      return row ? mapLine(row) : undefined;
    },
    async unmatchBankStatementLine(tenantId, reconciliationId, lineId) {
      const [row] = await db()<ReconciliationLineRow>(reconciliationLinesTable).where({ tenant_id: tenantId, reconciliation_id: reconciliationId, id: lineId }).update({ matched_journal_entry_id: null, matched_journal_entry_line_id: null, matched_at: null, updated_at: new Date() }).returning("*");
      return row ? mapLine(row) : undefined;
    },
    async getUnreconciledJournalLines(request: UnreconciledJournalLinesRequest) { return this.getCashBankLedger({ ...request, reconciled: false }); },
    async calculateReconciliationTotals(tenantId, reconciliationId) {
      const record = await this.getBankReconciliationById(tenantId, reconciliationId);
      if (!record) return undefined;
      const systemOpeningBalance = await systemBalance(tenantId, record.bankAccountId, new Date(`${record.statementStartDate}T00:00:00Z`).toISOString().slice(0, 10));
      const systemClosingBalance = await systemBalance(tenantId, record.bankAccountId, record.statementEndDate);
      return { ...totalsFrom({ ...record, systemOpeningBalance, systemClosingBalance }), systemOpeningBalance, systemClosingBalance };
    },
    async getBankReconciliationStats(request) {
      const rows = await db()<ReconciliationRow>(reconciliationsTable).where({ tenant_id: request.tenantId }).whereNull("deleted_at");
      const mapped = rows.map((row) => mapReconciliation(row));
      return {
        total: mapped.length,
        draftCount: mapped.filter((row) => row.status === "DRAFT").length,
        completedCount: mapped.filter((row) => row.status === "COMPLETED").length,
        cancelledCount: mapped.filter((row) => row.status === "CANCELLED").length,
        unreconciledAmount: roundMoney(mapped.reduce((sum, row) => sum + row.unmatchedStatementAmount, 0)),
        differenceAmount: roundMoney(mapped.reduce((sum, row) => sum + Math.abs(row.differenceAmount), 0)),
      } satisfies BankReconciliationStats;
    },
  };
}

export const bankingRepository = createBankingRepository();

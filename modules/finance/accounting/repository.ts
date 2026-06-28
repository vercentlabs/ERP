import { randomUUID } from "node:crypto";
import { getTenantKnex } from "@vercent/database/knex";
import type { Knex } from "knex";
import type {
  AccountCreateInput, AccountGroupCreateInput, AccountGroupRecord, AccountListRequest, AccountRecord, AccountUpdateInput,
  AccountingRepository, AccountingSettingsRecord, FiscalYearCreateInput, FiscalYearListRequest, FiscalYearRecord, JournalEntryCreateInput, JournalEntryLineRecord,
  JournalEntryListRequest, JournalEntryRecord, JournalEntryUpdateInput, TrialBalanceRequest, TrialBalanceRow,
} from "./types";

const groupsTable = "finance_account_groups";
const accountsTable = "finance_accounts";
const yearsTable = "finance_fiscal_years";
const journalsTable = "finance_journal_entries";
const linesTable = "finance_journal_entry_lines";
const settingsTable = "finance_accounting_settings";

const toNullable = <T>(value: T | undefined | null) => value ?? null;
const compact = (input: Record<string, unknown>) => Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));
const toIso = (value: Date | string | null | undefined) => (!value ? undefined : value instanceof Date ? value.toISOString() : value);
const toDate = (value: Date | string | null | undefined) => toIso(value)?.slice(0, 10);
const money = (value: unknown) => Number(value ?? 0);
const numberWithPrefix = (prefix: string, explicit?: string) => explicit ?? `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;

type GroupRow = { id: string; tenant_id: string; company_id: string | null; branch_id: string | null; name: string; code: string; type: AccountGroupRecord["type"]; parent_group_id: string | null; is_system: boolean; is_active: boolean; created_at: Date | string; updated_at: Date | string; deleted_at: Date | string | null };
type AccountRow = { id: string; tenant_id: string; company_id: string | null; branch_id: string | null; account_code: string; account_name: string; account_type: AccountRecord["accountType"]; group_id: string | null; parent_account_id: string | null; normal_balance: AccountRecord["normalBalance"]; is_control_account: boolean; is_cash_account: boolean; is_bank_account: boolean; is_system: boolean; is_active: boolean; opening_balance: string | number; opening_balance_type: AccountRecord["openingBalanceType"]; created_at: Date | string; updated_at: Date | string; deleted_at: Date | string | null };
type FiscalYearRow = { id: string; tenant_id: string; company_id: string | null; branch_id: string | null; name: string; start_date: Date | string; end_date: Date | string; status: FiscalYearRecord["status"]; is_default: boolean; created_at: Date | string; updated_at: Date | string; closed_at: Date | string | null };
type JournalRow = { id: string; tenant_id: string; company_id: string | null; branch_id: string | null; journal_number: string; journal_date: Date | string; posting_date: Date | string | null; fiscal_year_id: string; reference_type: string | null; reference_id: string | null; source_module: string | null; status: JournalEntryRecord["status"]; narration: string | null; total_debit: string | number; total_credit: string | number; posted_at: Date | string | null; cancelled_at: Date | string | null; created_at: Date | string; updated_at: Date | string; deleted_at: Date | string | null };
type LineRow = { id: string; tenant_id: string; journal_entry_id: string; line_number: number; account_id: string; party_id: string | null; customer_id: string | null; supplier_id: string | null; debit_amount: string | number; credit_amount: string | number; narration: string | null; created_at: Date | string; updated_at: Date | string };
type SettingsRow = { id: string; tenant_id: string; company_id: string | null; branch_id: string | null; accounts_receivable_account_id: string; sales_income_account_id: string; sales_returns_account_id: string | null; additional_charges_income_account_id: string | null; sales_tax_payable_account_id: string | null; rounding_adjustment_account_id: string | null; created_at: Date | string; updated_at: Date | string };

function mapGroup(row: GroupRow): AccountGroupRecord {
  return { id: row.id, tenantId: row.tenant_id, companyId: row.company_id ?? undefined, branchId: row.branch_id ?? undefined, name: row.name, code: row.code, type: row.type, parentGroupId: row.parent_group_id ?? undefined, isSystem: row.is_system, isActive: row.is_active, createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)!, deletedAt: toIso(row.deleted_at) };
}
function mapAccount(row: AccountRow): AccountRecord {
  return { id: row.id, tenantId: row.tenant_id, companyId: row.company_id ?? undefined, branchId: row.branch_id ?? undefined, accountCode: row.account_code, accountName: row.account_name, accountType: row.account_type, groupId: row.group_id ?? undefined, parentAccountId: row.parent_account_id ?? undefined, normalBalance: row.normal_balance, isControlAccount: row.is_control_account, isCashAccount: row.is_cash_account, isBankAccount: row.is_bank_account, isSystem: row.is_system, isActive: row.is_active, openingBalance: money(row.opening_balance), openingBalanceType: row.opening_balance_type, createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)!, deletedAt: toIso(row.deleted_at) };
}
function mapYear(row: FiscalYearRow): FiscalYearRecord {
  return { id: row.id, tenantId: row.tenant_id, companyId: row.company_id ?? undefined, branchId: row.branch_id ?? undefined, name: row.name, startDate: toDate(row.start_date)!, endDate: toDate(row.end_date)!, status: row.status, isDefault: row.is_default, createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)!, closedAt: toIso(row.closed_at) };
}
function mapLine(row: LineRow): JournalEntryLineRecord {
  return { id: row.id, journalEntryId: row.journal_entry_id, lineNumber: row.line_number, accountId: row.account_id, partyId: row.party_id ?? undefined, customerId: row.customer_id ?? undefined, supplierId: row.supplier_id ?? undefined, debitAmount: money(row.debit_amount), creditAmount: money(row.credit_amount), narration: row.narration ?? undefined, createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)! };
}
function mapJournal(row: JournalRow, lines: JournalEntryLineRecord[] = []): JournalEntryRecord {
  return { id: row.id, tenantId: row.tenant_id, companyId: row.company_id ?? undefined, branchId: row.branch_id ?? undefined, journalNumber: row.journal_number, journalDate: toDate(row.journal_date)!, postingDate: toDate(row.posting_date), fiscalYearId: row.fiscal_year_id, referenceType: row.reference_type ?? undefined, referenceId: row.reference_id ?? undefined, sourceModule: row.source_module ?? undefined, status: row.status, narration: row.narration ?? undefined, totalDebit: money(row.total_debit), totalCredit: money(row.total_credit), postedAt: toIso(row.posted_at), cancelledAt: toIso(row.cancelled_at), createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)!, deletedAt: toIso(row.deleted_at), lines };
}
function mapSettings(row: SettingsRow): AccountingSettingsRecord {
  return { id: row.id, tenantId: row.tenant_id, companyId: row.company_id ?? undefined, branchId: row.branch_id ?? undefined, accountsReceivableAccountId: row.accounts_receivable_account_id, salesIncomeAccountId: row.sales_income_account_id, salesReturnsAccountId: row.sales_returns_account_id ?? undefined, additionalChargesIncomeAccountId: row.additional_charges_income_account_id ?? undefined, salesTaxPayableAccountId: row.sales_tax_payable_account_id ?? undefined, roundingAdjustmentAccountId: row.rounding_adjustment_account_id ?? undefined, createdAt: toIso(row.created_at)!, updatedAt: toIso(row.updated_at)! };
}

function scope(query: Knex.QueryBuilder, request: { tenantId: string; companyId?: string; branchId?: string }) {
  query.where("tenant_id", request.tenantId);
  if (request.companyId) query.where("company_id", request.companyId);
  if (request.branchId) query.where("branch_id", request.branchId);
  return query;
}
async function attachLines(connection: Knex, rows: JournalRow[]) {
  if (rows.length === 0) return [];
  const lineRows = await connection<LineRow>(linesTable).whereIn("journal_entry_id", rows.map((row) => row.id)).orderBy("line_number", "asc");
  const grouped = new Map<string, JournalEntryLineRecord[]>();
  for (const line of lineRows.map(mapLine)) grouped.set(line.journalEntryId, [...(grouped.get(line.journalEntryId) ?? []), line]);
  return rows.map((row) => mapJournal(row, grouped.get(row.id) ?? []));
}
async function insertLines(connection: Knex, tenantId: string, journalEntryId: string, lines: JournalEntryLineRecord[]) {
  await connection<LineRow>(linesTable).insert(lines.map((line) => ({ id: line.id, tenant_id: tenantId, journal_entry_id: journalEntryId, line_number: line.lineNumber, account_id: line.accountId, party_id: toNullable(line.partyId), customer_id: toNullable(line.customerId), supplier_id: toNullable(line.supplierId), debit_amount: line.debitAmount, credit_amount: line.creditAmount, narration: toNullable(line.narration) })));
}

export function createAccountingRepository(database?: Knex): AccountingRepository {
  const db = () => database ?? getTenantKnex();
  return {
    async createAccountGroup(input) {
      const [row] = await db()<GroupRow>(groupsTable).insert({ id: randomUUID(), tenant_id: input.tenantId, company_id: toNullable(input.companyId), branch_id: toNullable(input.branchId), name: input.name, code: input.code, type: input.type, parent_group_id: toNullable(input.parentGroupId), is_system: input.isSystem ?? false, is_active: input.isActive ?? true }).returning("*");
      return mapGroup(row);
    },
    async listAccountGroups(request) {
      const base = db()<GroupRow>(groupsTable); scope(base, request).whereNull("deleted_at");
      if (request.type) base.where("type", request.type);
      if (request.isActive !== undefined) base.where("is_active", request.isActive);
      if (request.search) base.andWhere((builder) => builder.whereILike("name", `%${request.search}%`).orWhereILike("code", `%${request.search}%`));
      const [{ count }] = await base.clone().clearSelect().clearOrder().count<{ count: string }>({ count: "*" });
      const rows = await base.orderBy("code", "asc").limit(request.pageSize ?? 25).offset(((request.page ?? 1) - 1) * (request.pageSize ?? 25));
      return { rows: rows.map(mapGroup), total: Number(count), page: request.page ?? 1, pageSize: request.pageSize ?? 25 };
    },
    async createAccount(input) {
      const normalBalance = input.normalBalance ?? (["ASSET", "EXPENSE"].includes(input.accountType) ? "DEBIT" : "CREDIT");
      const [row] = await db()<AccountRow>(accountsTable).insert({ id: randomUUID(), tenant_id: input.tenantId, company_id: toNullable(input.companyId), branch_id: toNullable(input.branchId), account_code: input.accountCode, account_name: input.accountName, account_type: input.accountType, group_id: toNullable(input.groupId), parent_account_id: toNullable(input.parentAccountId), normal_balance: normalBalance, is_control_account: input.isControlAccount ?? false, is_cash_account: input.isCashAccount ?? false, is_bank_account: input.isBankAccount ?? false, is_system: input.isSystem ?? false, is_active: input.isActive ?? true, opening_balance: input.openingBalance ?? 0, opening_balance_type: input.openingBalanceType ?? normalBalance }).returning("*");
      return mapAccount(row);
    },
    async listAccounts(request) {
      const base = db()<AccountRow>(accountsTable); scope(base, request).whereNull("deleted_at");
      if (request.type) base.where("account_type", request.type);
      if (request.isActive !== undefined) base.where("is_active", request.isActive);
      if (request.search) base.andWhere((builder) => builder.whereILike("account_code", `%${request.search}%`).orWhereILike("account_name", `%${request.search}%`));
      const [{ count }] = await base.clone().clearSelect().clearOrder().count<{ count: string }>({ count: "*" });
      const rows = await base.orderBy(request.sortBy ?? "account_code", request.sortDirection ?? "asc").limit(request.pageSize ?? 25).offset(((request.page ?? 1) - 1) * (request.pageSize ?? 25));
      return { rows: rows.map(mapAccount), total: Number(count), page: request.page ?? 1, pageSize: request.pageSize ?? 25 };
    },
    async getAccountById(tenantId, id) { const row = await db()<AccountRow>(accountsTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first(); return row ? mapAccount(row) : undefined; },
    async getAccountByCode(tenantId, accountCode, companyId) { const query = db()<AccountRow>(accountsTable).where({ tenant_id: tenantId, account_code: accountCode }).whereNull("deleted_at"); if (companyId) query.where("company_id", companyId); const row = await query.first(); return row ? mapAccount(row) : undefined; },
    async updateAccount(tenantId, id, input) {
      const patch = compact({ company_id: input.companyId, branch_id: input.branchId, account_name: input.accountName, account_type: input.accountType, group_id: input.groupId, parent_account_id: input.parentAccountId, normal_balance: input.normalBalance, is_control_account: input.isControlAccount, is_cash_account: input.isCashAccount, is_bank_account: input.isBankAccount, is_system: input.isSystem, is_active: input.isActive, opening_balance: input.openingBalance, opening_balance_type: input.openingBalanceType, updated_at: new Date() });
      const [row] = await db()<AccountRow>(accountsTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").update(patch).returning("*");
      return row ? mapAccount(row) : undefined;
    },
    async softDeleteAccount(tenantId, id) { const [row] = await db()<AccountRow>(accountsTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").update({ deleted_at: new Date(), updated_at: new Date() }).returning("*"); return row ? mapAccount(row) : undefined; },
    async createFiscalYear(input) {
      return await db().transaction(async (tx) => {
        if (input.isDefault) await tx<FiscalYearRow>(yearsTable).where({ tenant_id: input.tenantId }).modify((query) => { if (input.companyId) query.where("company_id", input.companyId); }).update({ is_default: false, updated_at: new Date() });
        const [row] = await tx<FiscalYearRow>(yearsTable).insert({ id: randomUUID(), tenant_id: input.tenantId, company_id: toNullable(input.companyId), branch_id: toNullable(input.branchId), name: input.name, start_date: input.startDate, end_date: input.endDate, is_default: input.isDefault ?? false }).returning("*");
        return mapYear(row);
      });
    },
    async listFiscalYears(request) {
      const base = db()<FiscalYearRow>(yearsTable); scope(base, request);
      if (request.status) base.where("status", request.status);
      if (request.search) base.whereILike("name", `%${request.search}%`);
      const [{ count }] = await base.clone().clearSelect().clearOrder().count<{ count: string }>({ count: "*" });
      const rows = await base.orderBy("start_date", "desc").limit(request.pageSize ?? 25).offset(((request.page ?? 1) - 1) * (request.pageSize ?? 25));
      return { rows: rows.map(mapYear), total: Number(count), page: request.page ?? 1, pageSize: request.pageSize ?? 25 };
    },
    async getFiscalYearById(tenantId, id) { const row = await db()<FiscalYearRow>(yearsTable).where({ tenant_id: tenantId, id }).first(); return row ? mapYear(row) : undefined; },
    async resolveOpenFiscalYearForDate(tenantId, date, companyId) {
      const query = db()<FiscalYearRow>(yearsTable).where({ tenant_id: tenantId, status: "OPEN" }).where("start_date", "<=", date).where("end_date", ">=", date);
      if (companyId) query.where("company_id", companyId);
      const row = await query.orderBy("is_default", "desc").orderBy("start_date", "desc").first();
      return row ? mapYear(row) : undefined;
    },
    async setDefaultFiscalYear(tenantId, id) {
      return await db().transaction(async (tx) => {
        const target = await tx<FiscalYearRow>(yearsTable).where({ tenant_id: tenantId, id }).first();
        if (!target) return undefined;
        await tx<FiscalYearRow>(yearsTable).where({ tenant_id: tenantId, company_id: target.company_id }).update({ is_default: false, updated_at: new Date() });
        const [row] = await tx<FiscalYearRow>(yearsTable).where({ tenant_id: tenantId, id }).update({ is_default: true, updated_at: new Date() }).returning("*");
        return row ? mapYear(row) : undefined;
      });
    },
    async closeFiscalYear(tenantId, id) { const [row] = await db()<FiscalYearRow>(yearsTable).where({ tenant_id: tenantId, id }).update({ status: "CLOSED", is_default: false, closed_at: new Date(), updated_at: new Date() }).returning("*"); return row ? mapYear(row) : undefined; },
    async createJournalEntry(input, lines, totals) {
      return await db().transaction(async (tx) => {
        const [row] = await tx<JournalRow>(journalsTable).insert({ id: randomUUID(), tenant_id: input.tenantId, company_id: toNullable(input.companyId), branch_id: toNullable(input.branchId), journal_number: numberWithPrefix("JE", input.journalNumber), journal_date: input.journalDate ?? new Date().toISOString().slice(0, 10), posting_date: toNullable(input.postingDate), fiscal_year_id: input.fiscalYearId, reference_type: toNullable(input.referenceType), reference_id: toNullable(input.referenceId), source_module: toNullable(input.sourceModule), narration: toNullable(input.narration), total_debit: totals.totalDebit, total_credit: totals.totalCredit }).returning("*");
        await insertLines(tx, input.tenantId, row.id, lines.map((line) => ({ ...line, journalEntryId: row.id })));
        return mapJournal(row, await tx<LineRow>(linesTable).where({ journal_entry_id: row.id }).orderBy("line_number").then((rows) => rows.map(mapLine)));
      });
    },
    async listJournalEntries(request) {
      const base = db()<JournalRow>(journalsTable); scope(base, request).whereNull("deleted_at");
      if (request.status) base.where("status", request.status);
      if (request.fiscalYearId) base.where("fiscal_year_id", request.fiscalYearId);
      if (request.dateFrom) base.where("journal_date", ">=", request.dateFrom);
      if (request.dateTo) base.where("journal_date", "<=", request.dateTo);
      if (request.search) base.andWhere((builder) => builder.whereILike("journal_number", `%${request.search}%`).orWhereILike("narration", `%${request.search}%`));
      const [{ count }] = await base.clone().clearSelect().clearOrder().count<{ count: string }>({ count: "*" });
      const rows = await base.orderBy(request.sortBy ?? "created_at", request.sortDirection ?? "desc").limit(request.pageSize ?? 25).offset(((request.page ?? 1) - 1) * (request.pageSize ?? 25));
      return { rows: await attachLines(db(), rows), total: Number(count), page: request.page ?? 1, pageSize: request.pageSize ?? 25 };
    },
    async getJournalEntryById(tenantId, id) { const row = await db()<JournalRow>(journalsTable).where({ tenant_id: tenantId, id }).whereNull("deleted_at").first(); return row ? (await attachLines(db(), [row]))[0] : undefined; },
    async updateJournalEntry(tenantId, id, input, lines, totals) {
      return await db().transaction(async (tx) => {
        const patch = compact({ company_id: input.companyId, branch_id: input.branchId, journal_date: input.journalDate, posting_date: input.postingDate, fiscal_year_id: input.fiscalYearId, reference_type: input.referenceType, reference_id: input.referenceId, source_module: input.sourceModule, narration: input.narration, total_debit: totals?.totalDebit, total_credit: totals?.totalCredit, updated_at: new Date() });
        const [row] = await tx<JournalRow>(journalsTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update(patch).returning("*");
        if (!row) return undefined;
        if (lines) { await tx<LineRow>(linesTable).where({ tenant_id: tenantId, journal_entry_id: id }).delete(); await insertLines(tx, tenantId, id, lines); }
        const currentLines = await tx<LineRow>(linesTable).where({ tenant_id: tenantId, journal_entry_id: id }).orderBy("line_number");
        return mapJournal(row, currentLines.map(mapLine));
      });
    },
    async softDeleteJournalEntry(tenantId, id) { const [row] = await db()<JournalRow>(journalsTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ deleted_at: new Date(), updated_at: new Date() }).returning("*"); return row ? mapJournal(row, []) : undefined; },
    async postJournalEntry(tenantId, id) { const [row] = await db()<JournalRow>(journalsTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ status: "POSTED", posting_date: db().raw("coalesce(posting_date, journal_date)"), posted_at: new Date(), updated_at: new Date() }).returning("*"); return row ? (await attachLines(db(), [row]))[0] : undefined; },
    async cancelDraftJournalEntry(tenantId, id) { const [row] = await db()<JournalRow>(journalsTable).where({ tenant_id: tenantId, id, status: "DRAFT" }).whereNull("deleted_at").update({ status: "CANCELLED", cancelled_at: new Date(), updated_at: new Date() }).returning("*"); return row ? (await attachLines(db(), [row]))[0] : undefined; },
    async getJournalEntryLines(tenantId, id) { return (await db()<LineRow>(linesTable).where({ tenant_id: tenantId, journal_entry_id: id }).orderBy("line_number")).map(mapLine); },
    async getTrialBalance(request) {
      const query = db()<LineRow>(`${linesTable} as jel`).join(`${journalsTable} as je`, "je.id", "jel.journal_entry_id").join(`${accountsTable} as a`, "a.id", "jel.account_id").where("je.tenant_id", request.tenantId).where("je.status", "POSTED").whereNull("je.deleted_at").select("a.id as account_id", "a.account_code", "a.account_name", "a.account_type", "a.normal_balance").sum({ debit: "jel.debit_amount" }).sum({ credit: "jel.credit_amount" }).groupBy("a.id", "a.account_code", "a.account_name", "a.account_type", "a.normal_balance").orderBy("a.account_code", "asc");
      if (request.companyId) query.where("je.company_id", request.companyId);
      if (request.fiscalYearId) query.where("je.fiscal_year_id", request.fiscalYearId);
      if (request.dateFrom) query.where("je.posting_date", ">=", request.dateFrom);
      if (request.dateTo) query.where("je.posting_date", "<=", request.dateTo);
      const rows = await query as unknown as Array<{ account_id: string; account_code: string; account_name: string; account_type: TrialBalanceRow["accountType"]; normal_balance: TrialBalanceRow["normalBalance"]; debit: string | number; credit: string | number }>;
      return rows.map((row) => ({ accountId: row.account_id, accountCode: row.account_code, accountName: row.account_name, accountType: row.account_type, normalBalance: row.normal_balance, debit: money(row.debit), credit: money(row.credit), netBalance: row.normal_balance === "DEBIT" ? money(row.debit) - money(row.credit) : money(row.credit) - money(row.debit) }));
    },
    async getAccountingSettings(tenantId, companyId, branchId) {
      const query = db()<SettingsRow>(settingsTable).where({ tenant_id: tenantId });
      if (companyId) query.where("company_id", companyId); else query.whereNull("company_id");
      if (branchId) query.where("branch_id", branchId); else query.whereNull("branch_id");
      const row = await query.first();
      return row ? mapSettings(row) : undefined;
    },
    async updateAccountingSettings(input) {
      const connection = db();
      const existing = await this.getAccountingSettings(input.tenantId, input.companyId, input.branchId);
      if (existing) {
        const [row] = await connection<SettingsRow>(settingsTable).where({ id: existing.id, tenant_id: input.tenantId }).update({ accounts_receivable_account_id: input.accountsReceivableAccountId, sales_income_account_id: input.salesIncomeAccountId, sales_returns_account_id: toNullable(input.salesReturnsAccountId), additional_charges_income_account_id: toNullable(input.additionalChargesIncomeAccountId), sales_tax_payable_account_id: toNullable(input.salesTaxPayableAccountId), rounding_adjustment_account_id: toNullable(input.roundingAdjustmentAccountId), updated_at: connection.fn.now() }).returning("*");
        return mapSettings(row);
      }
      const [row] = await connection<SettingsRow>(settingsTable).insert({ id: randomUUID(), tenant_id: input.tenantId, company_id: toNullable(input.companyId), branch_id: toNullable(input.branchId), accounts_receivable_account_id: input.accountsReceivableAccountId, sales_income_account_id: input.salesIncomeAccountId, sales_returns_account_id: toNullable(input.salesReturnsAccountId), additional_charges_income_account_id: toNullable(input.additionalChargesIncomeAccountId), sales_tax_payable_account_id: toNullable(input.salesTaxPayableAccountId), rounding_adjustment_account_id: toNullable(input.roundingAdjustmentAccountId) }).returning("*");
      return mapSettings(row);
    },
  };
}

export const accountingRepository = createAccountingRepository();

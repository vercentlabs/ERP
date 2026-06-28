export type PageResult<T> = { rows: T[]; total: number; page: number; pageSize: number };
export type AccountType = "ASSET" | "LIABILITY" | "EQUITY" | "INCOME" | "EXPENSE";
export type Account = { id: string; accountCode: string; accountName: string; accountType: AccountType; normalBalance: "DEBIT" | "CREDIT"; isControlAccount?: boolean; isCashAccount?: boolean; isBankAccount?: boolean; isActive: boolean; openingBalance: number };
export type AccountGroup = { id: string; name: string; code: string; type: AccountType; isActive: boolean };
export type FiscalYear = { id: string; name: string; startDate: string; endDate: string; status: "OPEN" | "CLOSED"; isDefault: boolean };
export type JournalLine = { id: string; lineNumber: number; accountId: string; debitAmount: number; creditAmount: number; narration?: string };
export type JournalEntry = { id: string; journalNumber: string; journalDate: string; postingDate?: string; fiscalYearId: string; status: "DRAFT" | "POSTED" | "CANCELLED"; narration?: string; totalDebit: number; totalCredit: number; lines: JournalLine[] };
export type TrialBalanceRow = { accountId: string; accountCode: string; accountName: string; accountType: AccountType; debit: number; credit: number; netBalance: number; normalBalance: "DEBIT" | "CREDIT" };
export type AccountingSettings = { id: string; accountsReceivableAccountId: string; salesIncomeAccountId: string; salesReturnsAccountId?: string; additionalChargesIncomeAccountId?: string; salesTaxPayableAccountId?: string; roundingAdjustmentAccountId?: string };

const apiBaseUrl = process.env.VERCENT_API_BASE_URL ?? "http://localhost:4000";
const tenantId = process.env.VERCENT_TENANT_ID ?? "demo-tenant";
function apiUrl(path: string, params?: Record<string, string | undefined>) { const url = new URL(path, apiBaseUrl); for (const [key, value] of Object.entries(params ?? {})) if (value) url.searchParams.set(key, value); return url; }
async function request<T>(path: string, init?: RequestInit, params?: Record<string, string | undefined>) {
  const response = await fetch(apiUrl(path, params), { ...init, cache: "no-store", headers: { "content-type": "application/json", "x-tenant-id": tenantId, "x-permissions": "*", ...(init?.headers ?? {}) } });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}

export const listAccountGroups = (params: Record<string, string | undefined> = {}) => request<PageResult<AccountGroup>>("/api/finance/account-groups", undefined, params);
export const createAccountGroup = (input: Record<string, unknown>) => request<AccountGroup>("/api/finance/account-groups", { method: "POST", body: JSON.stringify(input) });
export const listAccounts = (params: Record<string, string | undefined> = {}) => request<PageResult<Account>>("/api/finance/accounts", undefined, params);
export const getAccount = (id: string) => request<Account>(`/api/finance/accounts/${id}`);
export const createAccount = (input: Record<string, unknown>) => request<Account>("/api/finance/accounts", { method: "POST", body: JSON.stringify(input) });
export const updateAccount = (id: string, input: Record<string, unknown>) => request<Account>(`/api/finance/accounts/${id}`, { method: "PATCH", body: JSON.stringify(input) });
export const deleteAccount = (id: string) => request<Account>(`/api/finance/accounts/${id}`, { method: "DELETE" });
export const listFiscalYears = (params: Record<string, string | undefined> = {}) => request<PageResult<FiscalYear>>("/api/finance/fiscal-years", undefined, params);
export const createFiscalYear = (input: Record<string, unknown>) => request<FiscalYear>("/api/finance/fiscal-years", { method: "POST", body: JSON.stringify(input) });
export const setDefaultFiscalYear = (id: string) => request<FiscalYear>(`/api/finance/fiscal-years/${id}/default`, { method: "POST", body: JSON.stringify({}) });
export const closeFiscalYear = (id: string) => request<FiscalYear>(`/api/finance/fiscal-years/${id}/close`, { method: "POST", body: JSON.stringify({}) });
export const listJournalEntries = (params: Record<string, string | undefined> = {}) => request<PageResult<JournalEntry>>("/api/finance/journal-entries", undefined, params);
export const getJournalEntry = (id: string) => request<JournalEntry>(`/api/finance/journal-entries/${id}`);
export const createJournalEntry = (input: Record<string, unknown>) => request<JournalEntry>("/api/finance/journal-entries", { method: "POST", body: JSON.stringify(input) });
export const updateJournalEntry = (id: string, input: Record<string, unknown>) => request<JournalEntry>(`/api/finance/journal-entries/${id}`, { method: "PATCH", body: JSON.stringify(input) });
export const postJournalEntry = (id: string) => request<JournalEntry>(`/api/finance/journal-entries/${id}/post`, { method: "POST", body: JSON.stringify({}) });
export const cancelJournalEntry = (id: string) => request<JournalEntry>(`/api/finance/journal-entries/${id}/cancel`, { method: "POST", body: JSON.stringify({}) });
export const getTrialBalance = (params: Record<string, string | undefined> = {}) => request<TrialBalanceRow[]>("/api/finance/reports/trial-balance", undefined, params);
export const getAccountingSettings = () => request<AccountingSettings | null>("/api/finance/accounting/settings");
export const updateAccountingSettings = (input: Record<string, unknown>) => request<AccountingSettings>("/api/finance/accounting/settings", { method: "PATCH", body: JSON.stringify(input) });

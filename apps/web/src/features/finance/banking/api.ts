export type PageResult<T> = { rows: T[]; total: number; page: number; pageSize: number };
export type BankAccount = { id: string; accountId: string; accountName: string; bankName?: string; accountType: "CASH" | "CURRENT" | "SAVINGS" | "OD" | "OTHER"; currency: string; openingBalance: number; status: "ACTIVE" | "INACTIVE"; isDefault: boolean; notes?: string };
export type CashBankLedgerRow = { journalEntryId: string; journalEntryLineId: string; journalNumber: string; postingDate: string; accountCode: string; accountName: string; referenceType?: string; description?: string; debitAmount: number; creditAmount: number; amount: number; runningBalance: number; isReconciled: boolean };
export type CashBankSummary = { openingBalance: number; totalDebit: number; totalCredit: number; closingBalance: number; unreconciledAmount: number; unreconciledCount: number };
export type BankReconciliationLine = { id: string; transactionDate: string; description: string; referenceNumber?: string; debitAmount: number; creditAmount: number; amount: number; matchedJournalEntryLineId?: string };
export type BankReconciliation = { id: string; reconciliationNumber: string; bankAccountId: string; statementStartDate: string; statementEndDate: string; openingStatementBalance: number; closingStatementBalance: number; systemOpeningBalance: number; systemClosingBalance: number; matchedAmount: number; unmatchedStatementAmount: number; differenceAmount: number; status: "DRAFT" | "COMPLETED" | "CANCELLED"; notes?: string; lines: BankReconciliationLine[] };
export type BankReconciliationStats = { total: number; draftCount: number; completedCount: number; cancelledCount: number; unreconciledAmount: number; differenceAmount: number };

const apiBaseUrl = process.env.VERCENT_API_BASE_URL ?? "http://localhost:4000";
const tenantId = process.env.VERCENT_TENANT_ID ?? "demo-tenant";
function apiUrl(path: string, params?: Record<string, string | undefined>) { const url = new URL(path, apiBaseUrl); for (const [key, value] of Object.entries(params ?? {})) if (value) url.searchParams.set(key, value); return url; }
async function request<T>(path: string, init?: RequestInit, params?: Record<string, string | undefined>) {
  const response = await fetch(apiUrl(path, params), { ...init, cache: "no-store", headers: { "content-type": "application/json", "x-tenant-id": tenantId, "x-permissions": "*", ...(init?.headers ?? {}) } });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}

export const listBankAccounts = (params: Record<string, string | undefined> = {}) => request<PageResult<BankAccount>>("/api/finance/bank-accounts", undefined, params);
export const getBankAccount = (id: string) => request<BankAccount>(`/api/finance/bank-accounts/${id}`);
export const createBankAccount = (input: Record<string, unknown>) => request<BankAccount>("/api/finance/bank-accounts", { method: "POST", body: JSON.stringify(input) });
export const updateBankAccount = (id: string, input: Record<string, unknown>) => request<BankAccount>(`/api/finance/bank-accounts/${id}`, { method: "PATCH", body: JSON.stringify(input) });
export const deleteBankAccount = (id: string) => request<BankAccount>(`/api/finance/bank-accounts/${id}`, { method: "DELETE" });
export const setDefaultBankAccount = (id: string) => request<BankAccount>(`/api/finance/bank-accounts/${id}/default`, { method: "POST", body: JSON.stringify({}) });
export const getCashBankLedger = (params: Record<string, string | undefined> = {}) => request<PageResult<CashBankLedgerRow>>("/api/finance/cash-bank-ledger", undefined, params);
export const getCashBankSummary = (params: Record<string, string | undefined> = {}) => request<CashBankSummary>("/api/finance/cash-bank-summary", undefined, params);
export const getBankAccountLedger = (id: string, params: Record<string, string | undefined> = {}) => request<PageResult<CashBankLedgerRow>>(`/api/finance/bank-accounts/${id}/ledger`, undefined, params);
export const getUnreconciledJournalLines = (id: string, params: Record<string, string | undefined> = {}) => request<PageResult<CashBankLedgerRow>>(`/api/finance/bank-accounts/${id}/unreconciled-lines`, undefined, params);
export const listBankReconciliations = (params: Record<string, string | undefined> = {}) => request<PageResult<BankReconciliation>>("/api/finance/bank-reconciliations", undefined, params);
export const getBankReconciliation = (id: string) => request<BankReconciliation>(`/api/finance/bank-reconciliations/${id}`);
export const createBankReconciliation = (input: Record<string, unknown>) => request<BankReconciliation>("/api/finance/bank-reconciliations", { method: "POST", body: JSON.stringify(input) });
export const updateBankReconciliation = (id: string, input: Record<string, unknown>) => request<BankReconciliation>(`/api/finance/bank-reconciliations/${id}`, { method: "PATCH", body: JSON.stringify(input) });
export const cancelBankReconciliation = (id: string) => request<BankReconciliation>(`/api/finance/bank-reconciliations/${id}/cancel`, { method: "POST", body: JSON.stringify({}) });
export const completeBankReconciliation = (id: string) => request<BankReconciliation>(`/api/finance/bank-reconciliations/${id}/complete`, { method: "POST", body: JSON.stringify({}) });
export const deleteBankReconciliation = (id: string) => request<BankReconciliation>(`/api/finance/bank-reconciliations/${id}`, { method: "DELETE" });
export const addBankReconciliationLine = (id: string, input: Record<string, unknown>) => request<BankReconciliationLine>(`/api/finance/bank-reconciliations/${id}/lines`, { method: "POST", body: JSON.stringify(input) });
export const matchBankReconciliationLine = (id: string, lineId: string, journalEntryLineId: string) => request<BankReconciliationLine>(`/api/finance/bank-reconciliations/${id}/lines/${lineId}/match`, { method: "POST", body: JSON.stringify({ journalEntryLineId }) });
export const unmatchBankReconciliationLine = (id: string, lineId: string) => request<BankReconciliationLine>(`/api/finance/bank-reconciliations/${id}/lines/${lineId}/unmatch`, { method: "POST", body: JSON.stringify({}) });
export const getBankReconciliationStats = () => request<BankReconciliationStats>("/api/finance/bank-reconciliations/stats");

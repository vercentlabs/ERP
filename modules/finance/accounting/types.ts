import type { ActorContext, BranchId, CompanyId, PageRequest, PageResult, TenantId } from "@vercent/shared-types";

export const accountTypes = ["ASSET", "LIABILITY", "EQUITY", "INCOME", "EXPENSE"] as const;
export const balanceTypes = ["DEBIT", "CREDIT"] as const;
export const fiscalYearStatuses = ["OPEN", "CLOSED"] as const;
export const journalEntryStatuses = ["DRAFT", "POSTED", "CANCELLED"] as const;

export type AccountType = (typeof accountTypes)[number];
export type BalanceType = (typeof balanceTypes)[number];
export type FiscalYearStatus = (typeof fiscalYearStatuses)[number];
export type JournalEntryStatus = (typeof journalEntryStatuses)[number];
export type SortDirection = "asc" | "desc";

export type FinanceScope = { tenantId: TenantId; companyId?: CompanyId; branchId?: BranchId };
export type AccountingContext = ActorContext & { reason?: string };

export type AccountGroupRecord = FinanceScope & {
  id: string; name: string; code: string; type: AccountType; parentGroupId?: string; isSystem: boolean; isActive: boolean; createdAt: string; updatedAt: string; deletedAt?: string;
};
export type AccountRecord = FinanceScope & {
  id: string; accountCode: string; accountName: string; accountType: AccountType; groupId?: string; parentAccountId?: string; normalBalance: BalanceType;
  isControlAccount: boolean; isCashAccount: boolean; isBankAccount: boolean; isSystem: boolean; isActive: boolean; openingBalance: number; openingBalanceType: BalanceType; createdAt: string; updatedAt: string; deletedAt?: string;
};
export type FiscalYearRecord = FinanceScope & {
  id: string; name: string; startDate: string; endDate: string; status: FiscalYearStatus; isDefault: boolean; createdAt: string; updatedAt: string; closedAt?: string;
};
export type JournalEntryLineRecord = {
  id: string; journalEntryId: string; lineNumber: number; accountId: string; partyId?: string; customerId?: string; supplierId?: string; debitAmount: number; creditAmount: number; narration?: string; createdAt: string; updatedAt: string;
};
export type JournalEntryRecord = FinanceScope & {
  id: string; journalNumber: string; journalDate: string; postingDate?: string; fiscalYearId: string; referenceType?: string; referenceId?: string; sourceModule?: string; status: JournalEntryStatus;
  narration?: string; totalDebit: number; totalCredit: number; postedAt?: string; cancelledAt?: string; createdAt: string; updatedAt: string; deletedAt?: string; lines: JournalEntryLineRecord[];
};
export type TrialBalanceRow = { accountId: string; accountCode: string; accountName: string; accountType: AccountType; debit: number; credit: number; netBalance: number; normalBalance: BalanceType };
export type AccountingSettingsRecord = FinanceScope & {
  id: string; accountsReceivableAccountId: string; salesIncomeAccountId: string; salesReturnsAccountId?: string; additionalChargesIncomeAccountId?: string; salesTaxPayableAccountId?: string; roundingAdjustmentAccountId?: string; createdAt: string; updatedAt: string;
};

export type AccountGroupCreateInput = FinanceScope & { name: string; code: string; type: AccountType; parentGroupId?: string; isSystem?: boolean; isActive?: boolean };
export type AccountCreateInput = FinanceScope & { accountCode: string; accountName: string; accountType: AccountType; groupId?: string; parentAccountId?: string; normalBalance?: BalanceType; isControlAccount?: boolean; isCashAccount?: boolean; isBankAccount?: boolean; isSystem?: boolean; isActive?: boolean; openingBalance?: number; openingBalanceType?: BalanceType };
export type AccountUpdateInput = Partial<Omit<AccountCreateInput, "tenantId" | "accountCode">>;
export type FiscalYearCreateInput = FinanceScope & { name: string; startDate: string; endDate: string; isDefault?: boolean };
export type JournalEntryLineInput = { accountId: string; partyId?: string; customerId?: string; supplierId?: string; debitAmount?: number; creditAmount?: number; narration?: string };
export type JournalEntryCreateInput = FinanceScope & { journalNumber?: string; journalDate?: string; postingDate?: string; fiscalYearId: string; referenceType?: string; referenceId?: string; sourceModule?: string; narration?: string; lines: JournalEntryLineInput[] };
export type JournalEntryUpdateInput = Partial<Omit<JournalEntryCreateInput, "tenantId" | "journalNumber" | "lines">> & { lines?: JournalEntryLineInput[] };

export type AccountListRequest = Omit<PageRequest, "status"> & FinanceScope & { type?: AccountType; isActive?: boolean; sortBy?: "account_code" | "account_name" | "created_at" | "updated_at"; sortDirection?: SortDirection };
export type FiscalYearListRequest = Omit<PageRequest, "status"> & FinanceScope & { status?: FiscalYearStatus };
export type JournalEntryListRequest = Omit<PageRequest, "status"> & FinanceScope & { status?: JournalEntryStatus; fiscalYearId?: string; dateFrom?: string; dateTo?: string; sortBy?: "journal_date" | "posting_date" | "created_at" | "updated_at"; sortDirection?: SortDirection };
export type TrialBalanceRequest = FinanceScope & { fiscalYearId?: string; dateFrom?: string; dateTo?: string };
export type AccountingSettingsUpdateInput = FinanceScope & { accountsReceivableAccountId: string; salesIncomeAccountId: string; salesReturnsAccountId?: string; additionalChargesIncomeAccountId?: string; salesTaxPayableAccountId?: string; roundingAdjustmentAccountId?: string };

export type AccountingRepository = {
  createAccountGroup(input: AccountGroupCreateInput): Promise<AccountGroupRecord>;
  listAccountGroups(request: AccountListRequest): Promise<PageResult<AccountGroupRecord>>;
  createAccount(input: AccountCreateInput): Promise<AccountRecord>;
  listAccounts(request: AccountListRequest): Promise<PageResult<AccountRecord>>;
  getAccountById(tenantId: string, id: string): Promise<AccountRecord | undefined>;
  getAccountByCode(tenantId: string, accountCode: string, companyId?: string): Promise<AccountRecord | undefined>;
  updateAccount(tenantId: string, id: string, input: AccountUpdateInput): Promise<AccountRecord | undefined>;
  softDeleteAccount(tenantId: string, id: string): Promise<AccountRecord | undefined>;
  createFiscalYear(input: FiscalYearCreateInput): Promise<FiscalYearRecord>;
  listFiscalYears(request: FiscalYearListRequest): Promise<PageResult<FiscalYearRecord>>;
  getFiscalYearById(tenantId: string, id: string): Promise<FiscalYearRecord | undefined>;
  resolveOpenFiscalYearForDate(tenantId: string, date: string, companyId?: string): Promise<FiscalYearRecord | undefined>;
  setDefaultFiscalYear(tenantId: string, id: string): Promise<FiscalYearRecord | undefined>;
  closeFiscalYear(tenantId: string, id: string): Promise<FiscalYearRecord | undefined>;
  createJournalEntry(input: JournalEntryCreateInput, lines: JournalEntryLineRecord[], totals: { totalDebit: number; totalCredit: number }): Promise<JournalEntryRecord>;
  listJournalEntries(request: JournalEntryListRequest): Promise<PageResult<JournalEntryRecord>>;
  getJournalEntryById(tenantId: string, id: string): Promise<JournalEntryRecord | undefined>;
  updateJournalEntry(tenantId: string, id: string, input: JournalEntryUpdateInput, lines?: JournalEntryLineRecord[], totals?: { totalDebit: number; totalCredit: number }): Promise<JournalEntryRecord | undefined>;
  softDeleteJournalEntry(tenantId: string, id: string): Promise<JournalEntryRecord | undefined>;
  postJournalEntry(tenantId: string, id: string): Promise<JournalEntryRecord | undefined>;
  cancelDraftJournalEntry(tenantId: string, id: string): Promise<JournalEntryRecord | undefined>;
  getJournalEntryLines(tenantId: string, id: string): Promise<JournalEntryLineRecord[]>;
  getTrialBalance(request: TrialBalanceRequest): Promise<TrialBalanceRow[]>;
  getAccountingSettings(tenantId: string, companyId?: string, branchId?: string): Promise<AccountingSettingsRecord | undefined>;
  updateAccountingSettings(input: AccountingSettingsUpdateInput): Promise<AccountingSettingsRecord>;
};

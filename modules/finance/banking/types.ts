import type { ActorContext, BranchId, CompanyId, PageRequest, PageResult, TenantId } from "@vercent/shared-types";

export const bankAccountTypes = ["CASH", "CURRENT", "SAVINGS", "OD", "OTHER"] as const;
export const bankAccountStatuses = ["ACTIVE", "INACTIVE"] as const;
export const bankReconciliationStatuses = ["DRAFT", "COMPLETED", "CANCELLED"] as const;

export type BankAccountType = (typeof bankAccountTypes)[number];
export type BankAccountStatus = (typeof bankAccountStatuses)[number];
export type BankReconciliationStatus = (typeof bankReconciliationStatuses)[number];
export type SortDirection = "asc" | "desc";
export type FinanceScope = { tenantId: TenantId; companyId?: CompanyId; branchId?: BranchId };
export type BankingContext = ActorContext & { reason?: string };

export type BankAccountRecord = FinanceScope & {
  id: string;
  accountId: string;
  bankName?: string;
  accountName: string;
  accountNumberLast4?: string;
  ifscCode?: string;
  branchName?: string;
  accountType: BankAccountType;
  currency: string;
  openingBalance: number;
  status: BankAccountStatus;
  isDefault: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type CashBankLedgerRow = FinanceScope & {
  journalEntryId: string;
  journalEntryLineId: string;
  journalNumber: string;
  postingDate: string;
  journalDate: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  referenceType?: string;
  referenceId?: string;
  description?: string;
  debitAmount: number;
  creditAmount: number;
  amount: number;
  runningBalance: number;
  isReconciled: boolean;
  reconciliationId?: string;
};

export type CashBankSummary = {
  bankAccountId?: string;
  openingBalance: number;
  totalDebit: number;
  totalCredit: number;
  closingBalance: number;
  unreconciledAmount: number;
  unreconciledCount: number;
};

export type BankReconciliationLineRecord = {
  id: string;
  reconciliationId: string;
  transactionDate: string;
  description: string;
  referenceNumber?: string;
  debitAmount: number;
  creditAmount: number;
  amount: number;
  matchedJournalEntryId?: string;
  matchedJournalEntryLineId?: string;
  matchedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type BankReconciliationRecord = FinanceScope & {
  id: string;
  reconciliationNumber: string;
  bankAccountId: string;
  statementStartDate: string;
  statementEndDate: string;
  openingStatementBalance: number;
  closingStatementBalance: number;
  systemOpeningBalance: number;
  systemClosingBalance: number;
  matchedAmount: number;
  unmatchedStatementAmount: number;
  differenceAmount: number;
  status: BankReconciliationStatus;
  notes?: string;
  completedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  lines: BankReconciliationLineRecord[];
};

export type BankAccountCreateInput = FinanceScope & {
  accountId: string;
  bankName?: string;
  accountName: string;
  accountNumberLast4?: string;
  ifscCode?: string;
  branchName?: string;
  accountType: BankAccountType;
  currency?: string;
  openingBalance?: number;
  status?: BankAccountStatus;
  isDefault?: boolean;
  notes?: string;
};
export type BankAccountUpdateInput = Partial<Omit<BankAccountCreateInput, "tenantId" | "accountId">>;
export type BankAccountListRequest = Omit<PageRequest, "status"> & FinanceScope & { status?: BankAccountStatus; accountType?: BankAccountType; sortBy?: "created_at" | "updated_at" | "account_name"; sortDirection?: SortDirection };
export type CashBankLedgerRequest = FinanceScope & { bankAccountId?: string; accountId?: string; dateFrom?: string; dateTo?: string; referenceType?: string; reconciled?: boolean; page?: number; pageSize?: number };
export type UnreconciledJournalLinesRequest = CashBankLedgerRequest & { bankAccountId: string };

export type BankReconciliationLineInput = {
  transactionDate: string;
  description: string;
  referenceNumber?: string;
  debitAmount?: number;
  creditAmount?: number;
};
export type BankReconciliationCreateInput = FinanceScope & {
  reconciliationNumber?: string;
  bankAccountId: string;
  statementStartDate: string;
  statementEndDate: string;
  openingStatementBalance?: number;
  closingStatementBalance: number;
  notes?: string;
  lines?: BankReconciliationLineInput[];
};
export type BankReconciliationUpdateInput = Partial<Omit<BankReconciliationCreateInput, "tenantId" | "bankAccountId" | "reconciliationNumber">>;
export type BankReconciliationListRequest = Omit<PageRequest, "status"> & FinanceScope & { status?: BankReconciliationStatus; bankAccountId?: string; dateFrom?: string; dateTo?: string; sortBy?: "created_at" | "updated_at" | "statement_end_date"; sortDirection?: SortDirection };
export type MatchStatementLineInput = { journalEntryLineId: string };

export type BankReconciliationStats = {
  total: number;
  draftCount: number;
  completedCount: number;
  cancelledCount: number;
  unreconciledAmount: number;
  differenceAmount: number;
};

export type BankingRepository = {
  createBankAccount(input: BankAccountCreateInput): Promise<BankAccountRecord>;
  listBankAccounts(request: BankAccountListRequest): Promise<PageResult<BankAccountRecord>>;
  getBankAccountById(tenantId: string, id: string): Promise<BankAccountRecord | undefined>;
  updateBankAccount(tenantId: string, id: string, input: BankAccountUpdateInput): Promise<BankAccountRecord | undefined>;
  softDeleteBankAccount(tenantId: string, id: string): Promise<BankAccountRecord | undefined>;
  setDefaultBankAccount(tenantId: string, id: string): Promise<BankAccountRecord | undefined>;
  getCashBankLedger(request: CashBankLedgerRequest): Promise<PageResult<CashBankLedgerRow>>;
  getCashBankSummary(request: CashBankLedgerRequest): Promise<CashBankSummary>;
  createBankReconciliation(input: BankReconciliationCreateInput, lines: BankReconciliationLineRecord[], totals: ReconciliationTotals): Promise<BankReconciliationRecord>;
  listBankReconciliations(request: BankReconciliationListRequest): Promise<PageResult<BankReconciliationRecord>>;
  getBankReconciliationById(tenantId: string, id: string): Promise<BankReconciliationRecord | undefined>;
  updateDraftBankReconciliation(tenantId: string, id: string, input: BankReconciliationUpdateInput, lines?: BankReconciliationLineRecord[], totals?: ReconciliationTotals): Promise<BankReconciliationRecord | undefined>;
  softDeleteDraftBankReconciliation(tenantId: string, id: string): Promise<BankReconciliationRecord | undefined>;
  cancelDraftBankReconciliation(tenantId: string, id: string): Promise<BankReconciliationRecord | undefined>;
  completeBankReconciliation(tenantId: string, id: string, totals: ReconciliationTotals): Promise<BankReconciliationRecord | undefined>;
  getBankReconciliationLines(tenantId: string, id: string): Promise<BankReconciliationLineRecord[]>;
  addBankReconciliationLine(tenantId: string, reconciliationId: string, line: BankReconciliationLineRecord): Promise<BankReconciliationLineRecord | undefined>;
  replaceDraftBankReconciliationLines(tenantId: string, reconciliationId: string, lines: BankReconciliationLineRecord[]): Promise<BankReconciliationLineRecord[]>;
  matchBankStatementLine(tenantId: string, reconciliationId: string, lineId: string, journalEntryId: string, journalEntryLineId: string): Promise<BankReconciliationLineRecord | undefined>;
  unmatchBankStatementLine(tenantId: string, reconciliationId: string, lineId: string): Promise<BankReconciliationLineRecord | undefined>;
  getUnreconciledJournalLines(request: UnreconciledJournalLinesRequest): Promise<PageResult<CashBankLedgerRow>>;
  calculateReconciliationTotals(tenantId: string, reconciliationId: string): Promise<ReconciliationTotals | undefined>;
  getBankReconciliationStats(request: FinanceScope): Promise<BankReconciliationStats>;
};

export type ReconciliationTotals = {
  systemOpeningBalance: number;
  systemClosingBalance: number;
  matchedAmount: number;
  unmatchedStatementAmount: number;
  differenceAmount: number;
};

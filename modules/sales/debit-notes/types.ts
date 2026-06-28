import type { ActorContext, BranchId, CompanyId, PageRequest, PageResult, TenantId } from "@vercent/shared-types";

export const salesDebitNoteStatuses = ["DRAFT", "POSTED", "CANCELLED"] as const;
export const salesDebitNoteAccountingStatuses = ["NOT_POSTED", "POSTED"] as const;
export type SalesDebitNoteStatus = (typeof salesDebitNoteStatuses)[number];
export type SalesDebitNoteAccountingStatus = (typeof salesDebitNoteAccountingStatuses)[number];
export type SalesDebitNoteSortField = "created_at" | "updated_at" | "debit_note_date" | "posting_date" | "total_amount";
export type SortDirection = "asc" | "desc";

export type SalesDebitNoteLineRecord = {
  id: string;
  debitNoteId: string;
  salesInvoiceLineId?: string;
  lineNumber: number;
  itemId: string;
  itemName: string;
  description?: string;
  quantity: number;
  uomId: string;
  unitAmount: number;
  taxableAmount: number;
  taxRate: number;
  taxAmount: number;
  lineTotal: number;
  createdAt: string;
  updatedAt: string;
};

export type SalesDebitNoteRecord = {
  id: string;
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  debitNoteNumber: string;
  salesInvoiceId: string;
  customerId: string;
  partyId?: string;
  debitNoteDate: string;
  postingDate?: string;
  status: SalesDebitNoteStatus;
  accountingStatus: SalesDebitNoteAccountingStatus;
  journalEntryId?: string;
  subtotalAmount: number;
  taxableAmount: number;
  taxAmount: number;
  totalAmount: number;
  reason?: string;
  notes?: string;
  postedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  lines: SalesDebitNoteLineRecord[];
};

export type SalesDebitNoteLineInput = {
  salesInvoiceLineId?: string;
  itemId: string;
  itemName?: string;
  description?: string;
  quantity: number;
  uomId: string;
  unitAmount: number;
  taxRate?: number;
};

export type SalesDebitNoteCreateInput = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  debitNoteNumber?: string;
  salesInvoiceId: string;
  debitNoteDate?: string;
  postingDate?: string;
  reason?: string;
  notes?: string;
  lines: SalesDebitNoteLineInput[];
};

export type SalesDebitNoteUpdateInput = Partial<Omit<SalesDebitNoteCreateInput, "tenantId" | "debitNoteNumber" | "salesInvoiceId" | "lines">> & {
  lines?: SalesDebitNoteLineInput[];
};

export type SalesDebitNoteListRequest = Omit<PageRequest, "status"> & {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  status?: SalesDebitNoteStatus;
  accountingStatus?: SalesDebitNoteAccountingStatus;
  customerId?: string;
  salesInvoiceId?: string;
  debitNoteDateFrom?: string;
  debitNoteDateTo?: string;
  sortBy?: SalesDebitNoteSortField;
  sortDirection?: SortDirection;
};

export type SalesDebitNoteTotals = {
  subtotalAmount: number;
  taxableAmount: number;
  taxAmount: number;
  totalAmount: number;
};

export type SalesDebitNoteStats = {
  total: number;
  draftValue: number;
  postedValue: number;
  cancelledValue: number;
  byStatus: Record<SalesDebitNoteStatus, { count: number; value: number }>;
};

export type SalesDebitNoteActionContext = ActorContext & { reason?: string };

export type SalesDebitNoteRepository = {
  createSalesDebitNote(input: SalesDebitNoteCreateInput & { customerId: string; partyId?: string }, lines: SalesDebitNoteLineRecord[], totals: SalesDebitNoteTotals, actorId?: string): Promise<SalesDebitNoteRecord>;
  listSalesDebitNotes(request: SalesDebitNoteListRequest): Promise<PageResult<SalesDebitNoteRecord>>;
  getSalesDebitNoteById(tenantId: string, id: string): Promise<SalesDebitNoteRecord | undefined>;
  getSalesDebitNoteByNumber(tenantId: string, debitNoteNumber: string, companyId?: string): Promise<SalesDebitNoteRecord | undefined>;
  getSalesDebitNotesByInvoice(tenantId: string, salesInvoiceId: string): Promise<SalesDebitNoteRecord[]>;
  updateSalesDebitNote(tenantId: string, id: string, input: SalesDebitNoteUpdateInput, lines: SalesDebitNoteLineRecord[] | undefined, totals: SalesDebitNoteTotals | undefined, actorId?: string): Promise<SalesDebitNoteRecord | undefined>;
  softDeleteSalesDebitNote(tenantId: string, id: string, actorId?: string): Promise<SalesDebitNoteRecord | undefined>;
  postSalesDebitNote(tenantId: string, id: string, journalEntryId: string, postingDate?: string, actorId?: string): Promise<SalesDebitNoteRecord | undefined>;
  cancelDraftSalesDebitNote(tenantId: string, id: string, actorId?: string): Promise<SalesDebitNoteRecord | undefined>;
  getSalesDebitNoteLines(tenantId: string, id: string): Promise<SalesDebitNoteLineRecord[]>;
  getSalesDebitNoteStats(tenantId: string, filters?: Pick<SalesDebitNoteListRequest, "companyId" | "branchId">): Promise<SalesDebitNoteStats>;
  calculateSalesDebitNoteTotals(lines: SalesDebitNoteLineRecord[]): SalesDebitNoteTotals;
};

export type DebitNotesRecord = SalesDebitNoteRecord;
export type DebitNotesCreateInput = SalesDebitNoteCreateInput;
export type DebitNotesUpdateInput = SalesDebitNoteUpdateInput;
export type DebitNotesListRequest = SalesDebitNoteListRequest;
export type DebitNotesActionContext = SalesDebitNoteActionContext;
export type DebitNotesStatus = SalesDebitNoteStatus;

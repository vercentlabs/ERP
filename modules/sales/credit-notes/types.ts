import type { ActorContext, BranchId, CompanyId, PageRequest, PageResult, TenantId } from "@vercent/shared-types";

export const salesCreditNoteStatuses = ["DRAFT", "POSTED", "CANCELLED"] as const;
export type SalesCreditNoteStatus = (typeof salesCreditNoteStatuses)[number];
export type SalesCreditNoteSortField = "created_at" | "updated_at" | "credit_note_date" | "posting_date" | "total_amount";
export type SortDirection = "asc" | "desc";

export type SalesCreditNoteLineRecord = {
  id: string;
  creditNoteId: string;
  salesInvoiceLineId?: string;
  lineNumber: number;
  itemId: string;
  itemName: string;
  description?: string;
  quantity: number;
  uomId: string;
  unitPrice: number;
  discountPercent: number;
  discountAmount: number;
  taxableAmount: number;
  taxRate: number;
  taxAmount: number;
  lineSubtotal: number;
  lineTotal: number;
  hsnSacCode?: string;
  createdAt: string;
  updatedAt: string;
};

export type SalesCreditNoteRecord = {
  id: string;
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  creditNoteNumber: string;
  salesInvoiceId: string;
  customerId: string;
  partyId?: string;
  creditNoteDate: string;
  postingDate?: string;
  status: SalesCreditNoteStatus;
  reason?: string;
  returnToStock: boolean;
  warehouseId?: string;
  currency: string;
  exchangeRate: number;
  subtotalAmount: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  totalAmount: number;
  journalEntryId?: string;
  postedAt?: string;
  cancelledAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  lines: SalesCreditNoteLineRecord[];
};

export type SalesCreditNoteLineInput = {
  salesInvoiceLineId?: string;
  itemId: string;
  itemName?: string;
  description?: string;
  quantity: number;
  uomId: string;
  unitPrice: number;
  discountPercent?: number;
  taxRate?: number;
  hsnSacCode?: string;
};

export type SalesCreditNoteCreateInput = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  creditNoteNumber?: string;
  salesInvoiceId: string;
  creditNoteDate?: string;
  postingDate?: string;
  reason?: string;
  returnToStock?: boolean;
  warehouseId?: string;
  notes?: string;
  lines: SalesCreditNoteLineInput[];
};

export type SalesCreditNoteUpdateInput = Partial<Omit<SalesCreditNoteCreateInput, "tenantId" | "creditNoteNumber" | "salesInvoiceId" | "lines">> & {
  lines?: SalesCreditNoteLineInput[];
};

export type SalesCreditNoteListRequest = Omit<PageRequest, "status"> & {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  status?: SalesCreditNoteStatus;
  customerId?: string;
  salesInvoiceId?: string;
  creditNoteDateFrom?: string;
  creditNoteDateTo?: string;
  sortBy?: SalesCreditNoteSortField;
  sortDirection?: SortDirection;
};

export type SalesCreditNoteTotals = {
  subtotalAmount: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  totalAmount: number;
};

export type SalesCreditNoteStats = {
  total: number;
  draftValue: number;
  postedValue: number;
  cancelledValue: number;
  byStatus: Record<SalesCreditNoteStatus, { count: number; value: number }>;
};

export type SalesCreditNoteActionContext = ActorContext & { reason?: string };

export type SalesCreditNoteRepository = {
  createSalesCreditNote(input: SalesCreditNoteCreateInput & { customerId: string; partyId?: string; currency: string; exchangeRate: number }, lines: SalesCreditNoteLineRecord[], totals: SalesCreditNoteTotals, actorId?: string): Promise<SalesCreditNoteRecord>;
  listSalesCreditNotes(request: SalesCreditNoteListRequest): Promise<PageResult<SalesCreditNoteRecord>>;
  getSalesCreditNoteById(tenantId: string, id: string): Promise<SalesCreditNoteRecord | undefined>;
  getSalesCreditNoteByNumber(tenantId: string, creditNoteNumber: string, companyId?: string): Promise<SalesCreditNoteRecord | undefined>;
  getSalesCreditNotesByInvoice(tenantId: string, salesInvoiceId: string): Promise<SalesCreditNoteRecord[]>;
  updateSalesCreditNote(tenantId: string, id: string, input: SalesCreditNoteUpdateInput, lines: SalesCreditNoteLineRecord[] | undefined, totals: SalesCreditNoteTotals | undefined, actorId?: string): Promise<SalesCreditNoteRecord | undefined>;
  softDeleteSalesCreditNote(tenantId: string, id: string, actorId?: string): Promise<SalesCreditNoteRecord | undefined>;
  postSalesCreditNote(tenantId: string, id: string, journalEntryId: string, postingDate?: string, actorId?: string): Promise<SalesCreditNoteRecord | undefined>;
  cancelDraftSalesCreditNote(tenantId: string, id: string, actorId?: string): Promise<SalesCreditNoteRecord | undefined>;
  getSalesCreditNoteLines(tenantId: string, id: string): Promise<SalesCreditNoteLineRecord[]>;
  getSalesCreditNoteStats(tenantId: string, filters?: Pick<SalesCreditNoteListRequest, "companyId" | "branchId">): Promise<SalesCreditNoteStats>;
  calculateSalesCreditNoteTotals(lines: SalesCreditNoteLineRecord[]): SalesCreditNoteTotals;
};

export type CreditNotesRecord = SalesCreditNoteRecord;
export type CreditNotesCreateInput = SalesCreditNoteCreateInput;
export type CreditNotesUpdateInput = SalesCreditNoteUpdateInput;
export type CreditNotesListRequest = SalesCreditNoteListRequest;
export type CreditNotesActionContext = SalesCreditNoteActionContext;
export type CreditNotesStatus = SalesCreditNoteStatus;

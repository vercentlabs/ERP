import type { ActorContext, BranchId, CompanyId, PageRequest, PageResult, TenantId, UserId } from "@vercent/shared-types";

export const quotationStatuses = ["DRAFT", "SENT", "ACCEPTED", "REJECTED", "EXPIRED", "CANCELLED"] as const;
export type QuotationStatus = (typeof quotationStatuses)[number];
export type QuotationSortField = "created_at" | "updated_at" | "quote_date" | "valid_until" | "total_amount";
export type SortDirection = "asc" | "desc";

export type QuotationLineRecord = {
  id: string;
  quotationId: string;
  lineNumber: number;
  itemId: string;
  itemName: string;
  description?: string;
  quantity: number;
  uomId: string;
  unitPrice: number;
  discountPercent: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  lineSubtotal: number;
  lineTotal: number;
  createdAt: string;
  updatedAt: string;
};

export type QuotationRecord = {
  id: string;
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  quotationNumber: string;
  customerId: string;
  partyId?: string;
  opportunityId?: string;
  quoteDate: string;
  validUntil: string;
  status: QuotationStatus;
  currency: string;
  exchangeRate: number;
  priceListId?: string;
  billingAddressId?: string;
  shippingAddressId?: string;
  subtotalAmount: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  terms?: string;
  notes?: string;
  rejectionReason?: string;
  ownerUserId?: UserId;
  assignedTeamId?: string;
  acceptedAt?: string;
  rejectedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  lines: QuotationLineRecord[];
};

export type QuotationLineInput = {
  itemId: string;
  itemName?: string;
  description?: string;
  quantity: number;
  uomId: string;
  unitPrice: number;
  discountPercent?: number;
  taxRate?: number;
};

export type QuotationCreateInput = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  quotationNumber?: string;
  customerId: string;
  partyId?: string;
  opportunityId?: string;
  quoteDate?: string;
  validUntil: string;
  status?: QuotationStatus;
  currency?: string;
  exchangeRate?: number;
  priceListId?: string;
  billingAddressId?: string;
  shippingAddressId?: string;
  terms?: string;
  notes?: string;
  ownerUserId?: UserId;
  assignedTeamId?: string;
  lines: QuotationLineInput[];
};

export type QuotationUpdateInput = Partial<Omit<QuotationCreateInput, "tenantId" | "quotationNumber" | "lines">> & {
  lines?: QuotationLineInput[];
};

export type QuotationListRequest = PageRequest & {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  status?: QuotationStatus;
  customerId?: string;
  opportunityId?: string;
  ownerUserId?: UserId;
  quoteDateFrom?: string;
  quoteDateTo?: string;
  validUntilFrom?: string;
  validUntilTo?: string;
  sortBy?: QuotationSortField;
  sortDirection?: SortDirection;
};

export type QuotationStatusChangeInput = {
  status: QuotationStatus;
  rejectionReason?: string;
};

export type QuotationTotals = {
  subtotalAmount: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
};

export type QuotationStats = {
  total: number;
  draftValue: number;
  sentValue: number;
  acceptedValue: number;
  rejectedExpiredValue: number;
  byStatus: Record<QuotationStatus, { count: number; value: number }>;
};

export type QuotationActionContext = ActorContext & {
  reason?: string;
};

export type QuotationRepository = {
  createQuotation(input: QuotationCreateInput, lines: QuotationLineRecord[], totals: QuotationTotals, actorId?: string): Promise<QuotationRecord>;
  listQuotations(request: QuotationListRequest): Promise<PageResult<QuotationRecord>>;
  getQuotationById(tenantId: string, id: string): Promise<QuotationRecord | undefined>;
  getQuotationByNumber(tenantId: string, quotationNumber: string, companyId?: string): Promise<QuotationRecord | undefined>;
  updateQuotation(
    tenantId: string,
    id: string,
    input: QuotationUpdateInput,
    lines: QuotationLineRecord[] | undefined,
    totals: QuotationTotals | undefined,
    actorId?: string,
  ): Promise<QuotationRecord | undefined>;
  softDeleteQuotation(tenantId: string, id: string, actorId?: string): Promise<QuotationRecord | undefined>;
  changeQuotationStatus(tenantId: string, id: string, input: QuotationStatusChangeInput, actorId?: string): Promise<QuotationRecord | undefined>;
  getQuotationStats(tenantId: string, filters?: Pick<QuotationListRequest, "companyId" | "branchId" | "ownerUserId">): Promise<QuotationStats>;
  getQuotationLines(tenantId: string, quotationId: string): Promise<QuotationLineRecord[]>;
  replaceQuotationLines(tenantId: string, quotationId: string, lines: QuotationLineRecord[]): Promise<QuotationLineRecord[]>;
  calculateQuotationTotals(lines: QuotationLineRecord[]): QuotationTotals;
};

export type QuotationsRecord = QuotationRecord;
export type QuotationsCreateInput = QuotationCreateInput;
export type QuotationsUpdateInput = QuotationUpdateInput;
export type QuotationsListRequest = QuotationListRequest;
export type QuotationsActionContext = QuotationActionContext;
export type QuotationsStatus = QuotationStatus;

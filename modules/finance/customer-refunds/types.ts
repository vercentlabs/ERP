import type { ActorContext, BranchId, CompanyId, PageRequest, PageResult, TenantId } from "@vercent/shared-types";

export const customerRefundStatuses = ["DRAFT", "POSTED", "CANCELLED"] as const;
export const customerRefundPaymentMethods = ["CASH", "BANK_TRANSFER", "CHEQUE", "UPI", "CARD", "OTHER"] as const;
export type CustomerRefundStatus = (typeof customerRefundStatuses)[number];
export type CustomerRefundPaymentMethod = (typeof customerRefundPaymentMethods)[number];
export type CustomerRefundSortField = "created_at" | "updated_at" | "refund_date" | "posting_date" | "total_amount";
export type SortDirection = "asc" | "desc";

export type CustomerRefundAllocationRecord = {
  id: string;
  refundId: string;
  creditNoteId: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export type CustomerRefundRecord = {
  id: string;
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  refundNumber: string;
  customerId: string;
  partyId?: string;
  refundDate: string;
  postingDate?: string;
  status: CustomerRefundStatus;
  paymentMethod: CustomerRefundPaymentMethod;
  depositAccountId: string;
  totalAmount: number;
  referenceNumber?: string;
  notes?: string;
  journalEntryId?: string;
  postedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  allocations: CustomerRefundAllocationRecord[];
};

export type CustomerRefundAllocationInput = { creditNoteId: string; amount: number };
export type CustomerRefundCreateInput = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  refundNumber?: string;
  customerId: string;
  partyId?: string;
  refundDate?: string;
  postingDate?: string;
  paymentMethod: CustomerRefundPaymentMethod;
  depositAccountId: string;
  totalAmount: number;
  referenceNumber?: string;
  notes?: string;
  allocations: CustomerRefundAllocationInput[];
};
export type CustomerRefundUpdateInput = Partial<Omit<CustomerRefundCreateInput, "tenantId" | "refundNumber" | "allocations">> & { allocations?: CustomerRefundAllocationInput[] };
export type CustomerRefundListRequest = Omit<PageRequest, "status"> & {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  status?: CustomerRefundStatus;
  customerId?: string;
  paymentMethod?: CustomerRefundPaymentMethod;
  refundDateFrom?: string;
  refundDateTo?: string;
  postingDateFrom?: string;
  postingDateTo?: string;
  sortBy?: CustomerRefundSortField;
  sortDirection?: SortDirection;
};
export type CustomerRefundStats = {
  total: number;
  draftValue: number;
  postedValue: number;
  cancelledValue: number;
  refundedValue: number;
  byStatus: Record<CustomerRefundStatus, { count: number; value: number }>;
};
export type CustomerRefundActionContext = ActorContext & { reason?: string };

export type CustomerRefundRepository = {
  createCustomerRefund(input: CustomerRefundCreateInput, allocations: CustomerRefundAllocationRecord[], actorId?: string): Promise<CustomerRefundRecord>;
  listCustomerRefunds(request: CustomerRefundListRequest): Promise<PageResult<CustomerRefundRecord>>;
  getCustomerRefundById(tenantId: string, id: string): Promise<CustomerRefundRecord | undefined>;
  getCustomerRefundByNumber(tenantId: string, refundNumber: string, companyId?: string): Promise<CustomerRefundRecord | undefined>;
  updateCustomerRefund(tenantId: string, id: string, input: CustomerRefundUpdateInput, allocations: CustomerRefundAllocationRecord[] | undefined, actorId?: string): Promise<CustomerRefundRecord | undefined>;
  softDeleteCustomerRefund(tenantId: string, id: string, actorId?: string): Promise<CustomerRefundRecord | undefined>;
  postCustomerRefund(tenantId: string, id: string, journalEntryId: string, postingDate?: string, actorId?: string): Promise<CustomerRefundRecord | undefined>;
  cancelDraftCustomerRefund(tenantId: string, id: string, actorId?: string): Promise<CustomerRefundRecord | undefined>;
  getCustomerRefundAllocations(tenantId: string, id: string): Promise<CustomerRefundAllocationRecord[]>;
  getCustomerRefundsByCreditNote(tenantId: string, creditNoteId: string): Promise<CustomerRefundRecord[]>;
  getCustomerRefundStats(tenantId: string, filters?: Pick<CustomerRefundListRequest, "companyId" | "branchId">): Promise<CustomerRefundStats>;
};

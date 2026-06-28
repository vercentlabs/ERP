import type { ActorContext, BranchId, CompanyId, PageRequest, PageResult, TenantId } from "@vercent/shared-types";

export const customerReceiptStatuses = ["DRAFT", "POSTED", "CANCELLED"] as const;
export const customerReceiptPaymentMethods = ["CASH", "BANK_TRANSFER", "CHEQUE", "UPI", "CARD", "OTHER"] as const;
export type CustomerReceiptStatus = (typeof customerReceiptStatuses)[number];
export type CustomerReceiptPaymentMethod = (typeof customerReceiptPaymentMethods)[number];
export type CustomerReceiptSortField = "created_at" | "updated_at" | "receipt_date" | "posting_date" | "amount_received";
export type SortDirection = "asc" | "desc";

export type CustomerReceiptAllocationRecord = {
  id: string;
  receiptId: string;
  salesInvoiceId: string;
  invoiceNumber: string;
  invoiceTotalAmount: number;
  invoiceAmountDueBefore: number;
  allocatedAmount: number;
  invoiceAmountDueAfter: number;
  createdAt: string;
  updatedAt: string;
};

export type CustomerReceiptRecord = {
  id: string;
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  receiptNumber: string;
  customerId: string;
  partyId?: string;
  receiptDate: string;
  postingDate?: string;
  status: CustomerReceiptStatus;
  paymentMethod: CustomerReceiptPaymentMethod;
  depositAccountId: string;
  referenceNumber?: string;
  referenceDate?: string;
  amountReceived: number;
  allocatedAmount: number;
  currency: string;
  exchangeRate: number;
  journalEntryId?: string;
  postedAt?: string;
  cancelledAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  allocations: CustomerReceiptAllocationRecord[];
};

export type CustomerReceiptAllocationInput = { salesInvoiceId: string; allocatedAmount: number };
export type CustomerReceiptCreateInput = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  receiptNumber?: string;
  customerId: string;
  partyId?: string;
  receiptDate?: string;
  postingDate?: string;
  paymentMethod: CustomerReceiptPaymentMethod;
  depositAccountId: string;
  referenceNumber?: string;
  referenceDate?: string;
  amountReceived: number;
  currency?: string;
  exchangeRate?: number;
  notes?: string;
  allocations: CustomerReceiptAllocationInput[];
};
export type CustomerReceiptUpdateInput = Partial<Omit<CustomerReceiptCreateInput, "tenantId" | "receiptNumber" | "allocations">> & { allocations?: CustomerReceiptAllocationInput[] };
export type CustomerReceiptListRequest = Omit<PageRequest, "status"> & {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  status?: CustomerReceiptStatus;
  customerId?: string;
  paymentMethod?: CustomerReceiptPaymentMethod;
  receiptDateFrom?: string;
  receiptDateTo?: string;
  postingDateFrom?: string;
  postingDateTo?: string;
  sortBy?: CustomerReceiptSortField;
  sortDirection?: SortDirection;
};
export type CustomerReceiptStats = {
  total: number;
  draftValue: number;
  postedValue: number;
  cancelledValue: number;
  byStatus: Record<CustomerReceiptStatus, { count: number; value: number }>;
};
export type CustomerReceiptActionContext = ActorContext & { reason?: string };

export type CustomerReceiptRepository = {
  createCustomerReceipt(input: CustomerReceiptCreateInput, allocations: CustomerReceiptAllocationRecord[], actorId?: string): Promise<CustomerReceiptRecord>;
  listCustomerReceipts(request: CustomerReceiptListRequest): Promise<PageResult<CustomerReceiptRecord>>;
  getCustomerReceiptById(tenantId: string, id: string): Promise<CustomerReceiptRecord | undefined>;
  getCustomerReceiptByNumber(tenantId: string, receiptNumber: string, companyId?: string): Promise<CustomerReceiptRecord | undefined>;
  updateCustomerReceipt(tenantId: string, id: string, input: CustomerReceiptUpdateInput, allocations: CustomerReceiptAllocationRecord[] | undefined, actorId?: string): Promise<CustomerReceiptRecord | undefined>;
  softDeleteCustomerReceipt(tenantId: string, id: string, actorId?: string): Promise<CustomerReceiptRecord | undefined>;
  postCustomerReceipt(tenantId: string, id: string, journalEntryId: string, postingDate?: string, actorId?: string): Promise<CustomerReceiptRecord | undefined>;
  cancelDraftCustomerReceipt(tenantId: string, id: string, actorId?: string): Promise<CustomerReceiptRecord | undefined>;
  getCustomerReceiptAllocations(tenantId: string, id: string): Promise<CustomerReceiptAllocationRecord[]>;
  replaceDraftCustomerReceiptAllocations(tenantId: string, receiptId: string, allocations: CustomerReceiptAllocationRecord[]): Promise<CustomerReceiptAllocationRecord[]>;
  getCustomerReceiptsByInvoice(tenantId: string, salesInvoiceId: string): Promise<CustomerReceiptRecord[]>;
  getCustomerReceiptsByCustomer(tenantId: string, customerId: string): Promise<CustomerReceiptRecord[]>;
  getCustomerReceiptStats(tenantId: string, filters?: Pick<CustomerReceiptListRequest, "companyId" | "branchId">): Promise<CustomerReceiptStats>;
};

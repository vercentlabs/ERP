import type { ActorContext, BranchId, CompanyId, PageRequest, PageResult, TenantId, UserId } from "@vercent/shared-types";

export const salesOrderStatuses = ["DRAFT", "CONFIRMED", "CANCELLED", "CLOSED"] as const;
export type SalesOrderStatus = (typeof salesOrderStatuses)[number];
export type SalesOrderSortField = "created_at" | "updated_at" | "order_date" | "expected_delivery_date" | "total_amount";
export type SortDirection = "asc" | "desc";

export type SalesOrderLineRecord = {
  id: string;
  orderId: string;
  quotationLineId?: string;
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

export type SalesOrderRecord = {
  id: string;
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  orderNumber: string;
  quotationId?: string;
  opportunityId?: string;
  customerId: string;
  partyId?: string;
  orderDate: string;
  expectedDeliveryDate?: string;
  status: SalesOrderStatus;
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
  ownerUserId?: UserId;
  assignedTeamId?: string;
  confirmedAt?: string;
  cancelledAt?: string;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  lines: SalesOrderLineRecord[];
};

export type SalesOrderLineInput = {
  quotationLineId?: string;
  itemId: string;
  itemName?: string;
  description?: string;
  quantity: number;
  uomId: string;
  unitPrice: number;
  discountPercent?: number;
  taxRate?: number;
};

export type SalesOrderCreateInput = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  orderNumber?: string;
  quotationId?: string;
  opportunityId?: string;
  customerId: string;
  partyId?: string;
  orderDate?: string;
  expectedDeliveryDate?: string;
  status?: SalesOrderStatus;
  currency?: string;
  exchangeRate?: number;
  priceListId?: string;
  billingAddressId?: string;
  shippingAddressId?: string;
  terms?: string;
  notes?: string;
  ownerUserId?: UserId;
  assignedTeamId?: string;
  lines: SalesOrderLineInput[];
};

export type SalesOrderUpdateInput = Partial<Omit<SalesOrderCreateInput, "tenantId" | "orderNumber" | "lines">> & {
  lines?: SalesOrderLineInput[];
};

export type SalesOrderListRequest = PageRequest & {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  status?: SalesOrderStatus;
  customerId?: string;
  quotationId?: string;
  opportunityId?: string;
  ownerUserId?: UserId;
  orderDateFrom?: string;
  orderDateTo?: string;
  expectedDeliveryFrom?: string;
  expectedDeliveryTo?: string;
  sortBy?: SalesOrderSortField;
  sortDirection?: SortDirection;
};

export type SalesOrderStatusChangeInput = {
  status: SalesOrderStatus;
};

export type CreateSalesOrderFromQuotationInput = {
  tenantId: TenantId;
  orderDate?: string;
  expectedDeliveryDate?: string;
  notes?: string;
};

export type SalesOrderTotals = {
  subtotalAmount: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
};

export type SalesOrderStats = {
  total: number;
  draftValue: number;
  confirmedValue: number;
  closedValue: number;
  cancelledValue: number;
  byStatus: Record<SalesOrderStatus, { count: number; value: number }>;
};

export type SalesOrderActionContext = ActorContext & {
  reason?: string;
};

export type SalesOrderRepository = {
  createSalesOrder(input: SalesOrderCreateInput, lines: SalesOrderLineRecord[], totals: SalesOrderTotals, actorId?: string): Promise<SalesOrderRecord>;
  createSalesOrderFromQuotation(input: SalesOrderCreateInput, lines: SalesOrderLineRecord[], totals: SalesOrderTotals, actorId?: string): Promise<SalesOrderRecord>;
  listSalesOrders(request: SalesOrderListRequest): Promise<PageResult<SalesOrderRecord>>;
  getSalesOrderById(tenantId: string, id: string): Promise<SalesOrderRecord | undefined>;
  getSalesOrderByNumber(tenantId: string, orderNumber: string, companyId?: string): Promise<SalesOrderRecord | undefined>;
  getSalesOrderByQuotationId(tenantId: string, quotationId: string): Promise<SalesOrderRecord | undefined>;
  updateSalesOrder(
    tenantId: string,
    id: string,
    input: SalesOrderUpdateInput,
    lines: SalesOrderLineRecord[] | undefined,
    totals: SalesOrderTotals | undefined,
    actorId?: string,
  ): Promise<SalesOrderRecord | undefined>;
  softDeleteSalesOrder(tenantId: string, id: string, actorId?: string): Promise<SalesOrderRecord | undefined>;
  changeSalesOrderStatus(tenantId: string, id: string, input: SalesOrderStatusChangeInput, actorId?: string): Promise<SalesOrderRecord | undefined>;
  getSalesOrderStats(tenantId: string, filters?: Pick<SalesOrderListRequest, "companyId" | "branchId" | "ownerUserId">): Promise<SalesOrderStats>;
  getSalesOrderLines(tenantId: string, orderId: string): Promise<SalesOrderLineRecord[]>;
  replaceSalesOrderLines(tenantId: string, orderId: string, lines: SalesOrderLineRecord[]): Promise<SalesOrderLineRecord[]>;
  calculateSalesOrderTotals(lines: SalesOrderLineRecord[]): SalesOrderTotals;
};

export type SalesOrdersRecord = SalesOrderRecord;
export type SalesOrdersCreateInput = SalesOrderCreateInput;
export type SalesOrdersUpdateInput = SalesOrderUpdateInput;
export type SalesOrdersListRequest = SalesOrderListRequest;
export type SalesOrdersActionContext = SalesOrderActionContext;
export type SalesOrdersStatus = SalesOrderStatus;

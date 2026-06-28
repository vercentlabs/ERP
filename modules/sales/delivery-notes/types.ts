import type { ActorContext, BranchId, CompanyId, PageRequest, PageResult, TenantId } from "@vercent/shared-types";
import type { SalesOrderRecord } from "../sales-orders/types";

export const deliveryNoteStatuses = ["DRAFT", "POSTED", "CANCELLED"] as const;
export type DeliveryNoteStatus = (typeof deliveryNoteStatuses)[number];
export type DeliveryNoteSortField = "created_at" | "updated_at" | "delivery_date" | "posting_date";
export type SortDirection = "asc" | "desc";

export type DeliveryNoteLineRecord = {
  id: string;
  deliveryNoteId: string;
  salesOrderLineId: string;
  lineNumber: number;
  itemId: string;
  itemName: string;
  description?: string;
  orderedQuantity: number;
  previouslyDeliveredQuantity: number;
  quantity: number;
  remainingQuantityAfterDelivery: number;
  uomId: string;
  warehouseId?: string;
  binId?: string;
  isStockItem: boolean;
  stockLedgerEntryId?: string;
  createdAt: string;
  updatedAt: string;
};

export type DeliveryNoteRecord = {
  id: string;
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  deliveryNoteNumber: string;
  salesOrderId: string;
  customerId: string;
  partyId?: string;
  deliveryDate: string;
  postingDate?: string;
  status: DeliveryNoteStatus;
  shippingAddressId?: string;
  warehouseId?: string;
  carrierName?: string;
  trackingNumber?: string;
  vehicleNumber?: string;
  ewayBillNumber?: string;
  notes?: string;
  postedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  lines: DeliveryNoteLineRecord[];
};

export type DeliveryNoteLineInput = {
  salesOrderLineId: string;
  quantity: number;
  warehouseId?: string;
  binId?: string;
};

export type DeliveryNoteCreateInput = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  deliveryNoteNumber?: string;
  salesOrderId: string;
  customerId?: string;
  partyId?: string;
  deliveryDate?: string;
  shippingAddressId?: string;
  warehouseId?: string;
  carrierName?: string;
  trackingNumber?: string;
  vehicleNumber?: string;
  ewayBillNumber?: string;
  notes?: string;
  lines: DeliveryNoteLineInput[];
};

export type CreateDeliveryNoteFromSalesOrderInput = {
  tenantId: TenantId;
  deliveryDate?: string;
  shippingAddressId?: string;
  warehouseId?: string;
  carrierName?: string;
  trackingNumber?: string;
  vehicleNumber?: string;
  ewayBillNumber?: string;
  notes?: string;
};

export type DeliveryNoteUpdateInput = Partial<Omit<DeliveryNoteCreateInput, "tenantId" | "deliveryNoteNumber" | "salesOrderId" | "lines">> & {
  lines?: DeliveryNoteLineInput[];
};

export type DeliveryNoteListRequest = Omit<PageRequest, "status"> & {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  status?: DeliveryNoteStatus;
  customerId?: string;
  salesOrderId?: string;
  warehouseId?: string;
  deliveryDateFrom?: string;
  deliveryDateTo?: string;
  postingDateFrom?: string;
  postingDateTo?: string;
  sortBy?: DeliveryNoteSortField;
  sortDirection?: SortDirection;
};

export type DeliveryNotePostInput = {
  postingDate?: string;
};

export type SalesOrderLineDeliverySummary = {
  salesOrderLineId: string;
  lineNumber: number;
  itemId: string;
  itemName: string;
  orderedQuantity: number;
  deliveredQuantity: number;
  remainingQuantity: number;
  uomId: string;
};

export type SalesOrderFulfillmentStatus = "NOT_DELIVERED" | "PARTIALLY_DELIVERED" | "DELIVERED";

export type SalesOrderDeliverySummary = {
  salesOrderId: string;
  orderNumber?: string;
  fulfillmentStatus: SalesOrderFulfillmentStatus;
  orderedQuantity: number;
  deliveredQuantity: number;
  remainingQuantity: number;
  lines: SalesOrderLineDeliverySummary[];
};

export type DeliveryNoteStats = {
  total: number;
  draftCount: number;
  postedCount: number;
  cancelledCount: number;
  deliveredOrdersCount: number;
  byStatus: Record<DeliveryNoteStatus, number>;
};

export type DeliveryNoteActionContext = ActorContext & {
  reason?: string;
};

export type DeliveryNoteRepository = {
  createDeliveryNote(input: DeliveryNoteCreateInput, lines: DeliveryNoteLineRecord[], actorId?: string): Promise<DeliveryNoteRecord>;
  createDeliveryNoteFromSalesOrder(input: DeliveryNoteCreateInput, lines: DeliveryNoteLineRecord[], actorId?: string): Promise<DeliveryNoteRecord>;
  listDeliveryNotes(request: DeliveryNoteListRequest): Promise<PageResult<DeliveryNoteRecord>>;
  getDeliveryNoteById(tenantId: string, id: string): Promise<DeliveryNoteRecord | undefined>;
  getDeliveryNoteByNumber(tenantId: string, deliveryNoteNumber: string, companyId?: string): Promise<DeliveryNoteRecord | undefined>;
  getDeliveryNotesBySalesOrder(tenantId: string, salesOrderId: string): Promise<DeliveryNoteRecord[]>;
  updateDeliveryNote(tenantId: string, id: string, input: DeliveryNoteUpdateInput, lines?: DeliveryNoteLineRecord[], actorId?: string): Promise<DeliveryNoteRecord | undefined>;
  softDeleteDeliveryNote(tenantId: string, id: string, actorId?: string): Promise<DeliveryNoteRecord | undefined>;
  postDeliveryNote(tenantId: string, id: string, input: DeliveryNotePostInput, stockLedgerEntryIdsByLineId: Map<string, string>, actorId?: string): Promise<DeliveryNoteRecord | undefined>;
  cancelDraftDeliveryNote(tenantId: string, id: string, actorId?: string): Promise<DeliveryNoteRecord | undefined>;
  getDeliveryNoteLines(tenantId: string, deliveryNoteId: string): Promise<DeliveryNoteLineRecord[]>;
  replaceDraftDeliveryNoteLines(tenantId: string, deliveryNoteId: string, lines: DeliveryNoteLineRecord[]): Promise<DeliveryNoteLineRecord[]>;
  getSalesOrderDeliverySummary(tenantId: string, salesOrder: SalesOrderRecord): Promise<SalesOrderDeliverySummary>;
  getSalesOrderLineDeliveredQuantities(tenantId: string, salesOrderId: string): Promise<Map<string, number>>;
  getDeliveryStats(tenantId: string, filters?: Pick<DeliveryNoteListRequest, "companyId" | "branchId" | "warehouseId">): Promise<DeliveryNoteStats>;
};

export type DeliveryNotesRecord = DeliveryNoteRecord;
export type DeliveryNotesCreateInput = DeliveryNoteCreateInput;
export type DeliveryNotesUpdateInput = DeliveryNoteUpdateInput;
export type DeliveryNotesListRequest = DeliveryNoteListRequest;
export type DeliveryNotesActionContext = DeliveryNoteActionContext;
export type DeliveryNotesStatus = DeliveryNoteStatus;

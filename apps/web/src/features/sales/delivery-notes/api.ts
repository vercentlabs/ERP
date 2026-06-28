export type DeliveryNoteStatus = "DRAFT" | "POSTED" | "CANCELLED";
export type FulfillmentStatus = "NOT_DELIVERED" | "PARTIALLY_DELIVERED" | "DELIVERED";
export type PageResult<T> = { rows: T[]; total: number; page: number; pageSize: number };

export type DeliveryNoteLineRecord = {
  id: string;
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
};

export type DeliveryNoteRecord = {
  id: string;
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
  lines: DeliveryNoteLineRecord[];
};

export type DeliveryNoteStats = { draftCount: number; postedCount: number; cancelledCount: number; deliveredOrdersCount: number };
export type SalesOrderDeliverySummary = {
  salesOrderId: string;
  orderNumber?: string;
  fulfillmentStatus: FulfillmentStatus;
  orderedQuantity: number;
  deliveredQuantity: number;
  remainingQuantity: number;
  lines: Array<{ salesOrderLineId: string; lineNumber: number; itemId: string; itemName: string; orderedQuantity: number; deliveredQuantity: number; remainingQuantity: number; uomId: string }>;
};
export type DeliveryNoteListParams = { search?: string; status?: string; customerId?: string; salesOrderId?: string; warehouseId?: string; page?: string; pageSize?: string };

const apiBaseUrl = process.env.VERCENT_API_BASE_URL ?? "http://localhost:4000";
const tenantId = process.env.VERCENT_TENANT_ID ?? "demo-tenant";

function apiUrl(path: string, params?: Record<string, string | undefined>) {
  const url = new URL(path, apiBaseUrl);
  for (const [key, value] of Object.entries(params ?? {})) if (value) url.searchParams.set(key, value);
  return url;
}

async function request<T>(path: string, init?: RequestInit, params?: Record<string, string | undefined>) {
  const response = await fetch(apiUrl(path, params), {
    ...init,
    cache: "no-store",
    headers: { "content-type": "application/json", "x-tenant-id": tenantId, "x-permissions": "*", ...(init?.headers ?? {}) },
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}

export function listDeliveryNotes(params: DeliveryNoteListParams) {
  return request<PageResult<DeliveryNoteRecord>>("/api/sales/delivery-notes", undefined, { ...params, pageSize: params.pageSize ?? "25" });
}

export function getDeliveryNoteStats(params: DeliveryNoteListParams = {}) {
  return request<DeliveryNoteStats>("/api/sales/delivery-notes/stats", undefined, params);
}

export function getDeliveryNote(id: string) {
  return request<DeliveryNoteRecord>(`/api/sales/delivery-notes/${id}`);
}

export function createDeliveryNote(input: Record<string, unknown>) {
  return request<DeliveryNoteRecord>("/api/sales/delivery-notes", { method: "POST", body: JSON.stringify(input) });
}

export function createDeliveryNoteFromSalesOrder(orderId: string, input: Record<string, unknown>) {
  return request<DeliveryNoteRecord>(`/api/sales/orders/${orderId}/create-delivery-note`, { method: "POST", body: JSON.stringify(input) });
}

export function updateDeliveryNote(id: string, input: Record<string, unknown>) {
  return request<DeliveryNoteRecord>(`/api/sales/delivery-notes/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function postDeliveryNote(id: string, input: Record<string, unknown>) {
  return request<DeliveryNoteRecord>(`/api/sales/delivery-notes/${id}/post`, { method: "POST", body: JSON.stringify(input) });
}

export function cancelDeliveryNote(id: string) {
  return request<DeliveryNoteRecord>(`/api/sales/delivery-notes/${id}/cancel`, { method: "POST", body: JSON.stringify({}) });
}

export function getSalesOrderDeliveryNotes(orderId: string) {
  return request<DeliveryNoteRecord[]>(`/api/sales/orders/${orderId}/delivery-notes`);
}

export function getSalesOrderDeliverySummary(orderId: string) {
  return request<SalesOrderDeliverySummary>(`/api/sales/orders/${orderId}/delivery-summary`);
}

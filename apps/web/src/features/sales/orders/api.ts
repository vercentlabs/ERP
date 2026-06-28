export type SalesOrderStatus = "DRAFT" | "CONFIRMED" | "CANCELLED" | "CLOSED";

export type PageResult<T> = { rows: T[]; total: number; page: number; pageSize: number };

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
};

export type SalesOrderDeliverySummary = {
  salesOrderId: string;
  orderNumber?: string;
  fulfillmentStatus: "NOT_DELIVERED" | "PARTIALLY_DELIVERED" | "DELIVERED";
  orderedQuantity: number;
  deliveredQuantity: number;
  remainingQuantity: number;
  lines: Array<{ salesOrderLineId: string; lineNumber: number; itemId: string; itemName: string; orderedQuantity: number; deliveredQuantity: number; remainingQuantity: number; uomId: string }>;
};

export type LinkedDeliveryNote = {
  id: string;
  deliveryNoteNumber: string;
  status: "DRAFT" | "POSTED" | "CANCELLED";
  deliveryDate: string;
  postingDate?: string;
};

export type SalesOrderRecord = {
  id: string;
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
  billingAddressId?: string;
  shippingAddressId?: string;
  subtotalAmount: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  terms?: string;
  notes?: string;
  confirmedAt?: string;
  cancelledAt?: string;
  closedAt?: string;
  lines: SalesOrderLineRecord[];
};

export type SalesOrderStats = { draftValue: number; confirmedValue: number; closedValue: number; cancelledValue: number };
export type SalesOrderListParams = { search?: string; status?: string; customerId?: string; quotationId?: string; opportunityId?: string; page?: string; pageSize?: string };

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

export function listSalesOrders(params: SalesOrderListParams) {
  return request<PageResult<SalesOrderRecord>>("/api/sales/orders", undefined, { ...params, pageSize: params.pageSize ?? "25" });
}

export function getSalesOrderStats(params: SalesOrderListParams = {}) {
  return request<SalesOrderStats>("/api/sales/orders/stats", undefined, params);
}

export function getSalesOrder(id: string) {
  return request<SalesOrderRecord>(`/api/sales/orders/${id}`);
}

export function createSalesOrder(input: Record<string, unknown>) {
  return request<SalesOrderRecord>("/api/sales/orders", { method: "POST", body: JSON.stringify(input) });
}

export function updateSalesOrder(id: string, input: Record<string, unknown>) {
  return request<SalesOrderRecord>(`/api/sales/orders/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function changeSalesOrderStatus(id: string, input: { status: SalesOrderStatus }) {
  return request<SalesOrderRecord>(`/api/sales/orders/${id}/status`, { method: "POST", body: JSON.stringify(input) });
}

export function convertQuotationToSalesOrder(quotationId: string, input: Record<string, unknown> = {}) {
  return request<SalesOrderRecord>(`/api/sales/quotations/${quotationId}/convert-to-order`, { method: "POST", body: JSON.stringify(input) });
}

export function getLinkedSalesOrder(quotationId: string) {
  return request<SalesOrderRecord | null>(`/api/sales/quotations/${quotationId}/linked-order`);
}

export function getSalesOrderDeliverySummary(orderId: string) {
  return request<SalesOrderDeliverySummary>(`/api/sales/orders/${orderId}/delivery-summary`);
}

export function getSalesOrderDeliveryNotes(orderId: string) {
  return request<LinkedDeliveryNote[]>(`/api/sales/orders/${orderId}/delivery-notes`);
}

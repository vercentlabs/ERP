export type SalesInvoiceStatus = "DRAFT" | "ISSUED" | "CANCELLED";
export type PaymentStatus = "UNPAID" | "PARTIALLY_PAID" | "PAID";
export type PageResult<T> = { rows: T[]; total: number; page: number; pageSize: number };
export type SalesInvoiceLine = { id: string; lineNumber: number; itemId: string; itemName: string; description?: string; quantity: number; uomId: string; unitPrice: number; discountAmount: number; taxableAmount: number; taxAmount: number; lineTotal: number };
export type SalesInvoice = {
  id: string; invoiceNumber: string; customerId: string; salesOrderId?: string; deliveryNoteId?: string; opportunityId?: string; quotationId?: string;
  invoiceDate: string; dueDate?: string; status: SalesInvoiceStatus; paymentStatus: PaymentStatus; accountingStatus: "NOT_POSTED" | "POSTED"; journalEntryId?: string; accountingPostedAt?: string; currency: string; subtotalAmount: number; discountAmount: number; taxableAmount: number; taxAmount: number; totalAmount: number; amountPaid: number; creditedAmount: number; debitedAmount: number; amountDue: number; terms?: string; notes?: string; lines: SalesInvoiceLine[];
};
export type SalesInvoiceStats = { draftValue: number; issuedValue: number; unpaidValue: number; overdueValue: number };
export type SalesInvoiceListParams = { search?: string; status?: string; paymentStatus?: string; customerId?: string; salesOrderId?: string; deliveryNoteId?: string; page?: string; pageSize?: string };
const apiBaseUrl = process.env.VERCENT_API_BASE_URL ?? "http://localhost:4000";
const tenantId = process.env.VERCENT_TENANT_ID ?? "demo-tenant";
function apiUrl(path: string, params?: Record<string, string | undefined>) { const url = new URL(path, apiBaseUrl); for (const [key, value] of Object.entries(params ?? {})) if (value) url.searchParams.set(key, value); return url; }
async function request<T>(path: string, init?: RequestInit, params?: Record<string, string | undefined>) {
  const response = await fetch(apiUrl(path, params), { ...init, cache: "no-store", headers: { "content-type": "application/json", "x-tenant-id": tenantId, "x-permissions": "*", ...(init?.headers ?? {}) } });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}
export const listSalesInvoices = (params: SalesInvoiceListParams) => request<PageResult<SalesInvoice>>("/api/sales/invoices", undefined, { ...params, pageSize: params.pageSize ?? "25" });
export const getSalesInvoiceStats = (params: SalesInvoiceListParams = {}) => request<SalesInvoiceStats>("/api/sales/invoices/stats", undefined, params);
export const getSalesInvoice = (id: string) => request<SalesInvoice>(`/api/sales/invoices/${id}`);
export const createSalesInvoice = (input: Record<string, unknown>) => request<SalesInvoice>("/api/sales/invoices", { method: "POST", body: JSON.stringify(input) });
export const updateSalesInvoice = (id: string, input: Record<string, unknown>) => request<SalesInvoice>(`/api/sales/invoices/${id}`, { method: "PATCH", body: JSON.stringify(input) });
export const issueSalesInvoice = (id: string, input: Record<string, unknown>) => request<SalesInvoice>(`/api/sales/invoices/${id}/issue`, { method: "POST", body: JSON.stringify(input) });
export const cancelSalesInvoice = (id: string) => request<SalesInvoice>(`/api/sales/invoices/${id}/cancel`, { method: "POST", body: JSON.stringify({}) });
export const postSalesInvoiceAccounting = (id: string, input: Record<string, unknown>) => request<{ invoice: SalesInvoice; journalEntry: { id: string; journalNumber: string } }>(`/api/sales/invoices/${id}/post-accounting`, { method: "POST", body: JSON.stringify(input) });
export const getSalesInvoiceAccounting = (id: string) => request<Pick<SalesInvoice, "id" | "invoiceNumber" | "accountingStatus" | "journalEntryId" | "accountingPostedAt">>(`/api/sales/invoices/${id}/accounting`);
export const getSalesInvoiceJournalEntry = (id: string) => request<{ id: string; journalNumber: string } | null>(`/api/sales/invoices/${id}/journal-entry`);
export const getSalesOrderInvoices = (orderId: string) => request<SalesInvoice[]>(`/api/sales/orders/${orderId}/invoices`);
export const createInvoiceFromSalesOrder = (orderId: string, input: Record<string, unknown>) => request<SalesInvoice>(`/api/sales/orders/${orderId}/create-invoice`, { method: "POST", body: JSON.stringify(input) });
export const getDeliveryNoteInvoice = (deliveryNoteId: string) => request<SalesInvoice | null>(`/api/sales/delivery-notes/${deliveryNoteId}/invoice`);
export const createInvoiceFromDeliveryNote = (deliveryNoteId: string, input: Record<string, unknown>) => request<SalesInvoice>(`/api/sales/delivery-notes/${deliveryNoteId}/create-invoice`, { method: "POST", body: JSON.stringify(input) });

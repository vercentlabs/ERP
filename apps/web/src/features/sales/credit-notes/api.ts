export type SalesCreditNoteStatus = "DRAFT" | "POSTED" | "CANCELLED";
export type PageResult<T> = { rows: T[]; total: number; page: number; pageSize: number };
export type SalesCreditNoteLine = { id: string; salesInvoiceLineId?: string; lineNumber: number; itemId: string; itemName: string; description?: string; quantity: number; uomId: string; unitPrice: number; discountPercent: number; discountAmount: number; taxableAmount: number; taxRate: number; taxAmount: number; lineTotal: number };
export type SalesCreditNote = {
  id: string; creditNoteNumber: string; salesInvoiceId: string; customerId: string; creditNoteDate: string; postingDate?: string; status: SalesCreditNoteStatus;
  reason?: string; returnToStock: boolean; warehouseId?: string; currency: string; subtotalAmount: number; discountAmount: number; taxableAmount: number; taxAmount: number; totalAmount: number;
  journalEntryId?: string; postedAt?: string; cancelledAt?: string; notes?: string; lines: SalesCreditNoteLine[];
};
export type SalesCreditNoteStats = { draftValue: number; postedValue: number; cancelledValue: number };
export type SalesCreditNoteListParams = { search?: string; status?: string; customerId?: string; salesInvoiceId?: string; page?: string; pageSize?: string };
const apiBaseUrl = process.env.VERCENT_API_BASE_URL ?? "http://localhost:4000";
const tenantId = process.env.VERCENT_TENANT_ID ?? "demo-tenant";
function apiUrl(path: string, params?: Record<string, string | undefined>) { const url = new URL(path, apiBaseUrl); for (const [key, value] of Object.entries(params ?? {})) if (value) url.searchParams.set(key, value); return url; }
async function request<T>(path: string, init?: RequestInit, params?: Record<string, string | undefined>) {
  const response = await fetch(apiUrl(path, params), { ...init, cache: "no-store", headers: { "content-type": "application/json", "x-tenant-id": tenantId, "x-permissions": "*", ...(init?.headers ?? {}) } });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}
export const listSalesCreditNotes = (params: SalesCreditNoteListParams = {}) => request<PageResult<SalesCreditNote>>("/api/sales/credit-notes", undefined, { ...params, pageSize: params.pageSize ?? "25" });
export const getSalesCreditNoteStats = (params: SalesCreditNoteListParams = {}) => request<SalesCreditNoteStats>("/api/sales/credit-notes/stats", undefined, params);
export const getSalesCreditNote = (id: string) => request<SalesCreditNote>(`/api/sales/credit-notes/${id}`);
export const createSalesCreditNote = (input: Record<string, unknown>) => request<SalesCreditNote>("/api/sales/credit-notes", { method: "POST", body: JSON.stringify(input) });
export const updateSalesCreditNote = (id: string, input: Record<string, unknown>) => request<SalesCreditNote>(`/api/sales/credit-notes/${id}`, { method: "PATCH", body: JSON.stringify(input) });
export const deleteSalesCreditNote = (id: string) => request<SalesCreditNote>(`/api/sales/credit-notes/${id}`, { method: "DELETE" });
export const postSalesCreditNote = (id: string, input: Record<string, unknown>) => request<{ creditNote: SalesCreditNote; journalEntry: { id: string; journalNumber: string } }>(`/api/sales/credit-notes/${id}/post`, { method: "POST", body: JSON.stringify(input) });
export const cancelSalesCreditNote = (id: string) => request<SalesCreditNote>(`/api/sales/credit-notes/${id}/cancel`, { method: "POST", body: JSON.stringify({}) });
export const getSalesCreditNoteLines = (id: string) => request<SalesCreditNoteLine[]>(`/api/sales/credit-notes/${id}/lines`);
export const getSalesInvoiceCreditNotes = (invoiceId: string) => request<SalesCreditNote[]>(`/api/sales/invoices/${invoiceId}/credit-notes`);
export const createCreditNoteFromInvoice = (invoiceId: string, input: Record<string, unknown>) => request<SalesCreditNote>(`/api/sales/invoices/${invoiceId}/create-credit-note`, { method: "POST", body: JSON.stringify(input) });

export type SalesDebitNoteStatus = "DRAFT" | "POSTED" | "CANCELLED";
export type PageResult<T> = { rows: T[]; total: number; page: number; pageSize: number };
export type SalesDebitNoteLine = { id: string; salesInvoiceLineId?: string; lineNumber: number; itemId: string; itemName: string; description?: string; quantity: number; uomId: string; unitAmount: number; taxableAmount: number; taxRate: number; taxAmount: number; lineTotal: number };
export type SalesDebitNote = {
  id: string; debitNoteNumber: string; salesInvoiceId: string; customerId: string; debitNoteDate: string; postingDate?: string; status: SalesDebitNoteStatus; accountingStatus: "NOT_POSTED" | "POSTED";
  reason?: string; subtotalAmount: number; taxableAmount: number; taxAmount: number; totalAmount: number; journalEntryId?: string; postedAt?: string; cancelledAt?: string; notes?: string; lines: SalesDebitNoteLine[];
};
export type SalesDebitNoteStats = { draftValue: number; postedValue: number; cancelledValue: number };
export type SalesDebitNoteListParams = { search?: string; status?: string; accountingStatus?: string; customerId?: string; salesInvoiceId?: string; page?: string; pageSize?: string };
const apiBaseUrl = process.env.VERCENT_API_BASE_URL ?? "http://localhost:4000";
const tenantId = process.env.VERCENT_TENANT_ID ?? "demo-tenant";
function apiUrl(path: string, params?: Record<string, string | undefined>) { const url = new URL(path, apiBaseUrl); for (const [key, value] of Object.entries(params ?? {})) if (value) url.searchParams.set(key, value); return url; }
async function request<T>(path: string, init?: RequestInit, params?: Record<string, string | undefined>) {
  const response = await fetch(apiUrl(path, params), { ...init, cache: "no-store", headers: { "content-type": "application/json", "x-tenant-id": tenantId, "x-permissions": "*", ...(init?.headers ?? {}) } });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}
export const listSalesDebitNotes = (params: SalesDebitNoteListParams = {}) => request<PageResult<SalesDebitNote>>("/api/sales/debit-notes", undefined, { ...params, pageSize: params.pageSize ?? "25" });
export const getSalesDebitNoteStats = (params: SalesDebitNoteListParams = {}) => request<SalesDebitNoteStats>("/api/sales/debit-notes/stats", undefined, params);
export const getSalesDebitNote = (id: string) => request<SalesDebitNote>(`/api/sales/debit-notes/${id}`);
export const createSalesDebitNote = (input: Record<string, unknown>) => request<SalesDebitNote>("/api/sales/debit-notes", { method: "POST", body: JSON.stringify(input) });
export const updateSalesDebitNote = (id: string, input: Record<string, unknown>) => request<SalesDebitNote>(`/api/sales/debit-notes/${id}`, { method: "PATCH", body: JSON.stringify(input) });
export const deleteSalesDebitNote = (id: string) => request<SalesDebitNote>(`/api/sales/debit-notes/${id}`, { method: "DELETE" });
export const postSalesDebitNote = (id: string, input: Record<string, unknown>) => request<{ debitNote: SalesDebitNote; journalEntry: { id: string; journalNumber: string } }>(`/api/sales/debit-notes/${id}/post`, { method: "POST", body: JSON.stringify(input) });
export const cancelSalesDebitNote = (id: string) => request<SalesDebitNote>(`/api/sales/debit-notes/${id}/cancel`, { method: "POST", body: JSON.stringify({}) });
export const getSalesDebitNoteLines = (id: string) => request<SalesDebitNoteLine[]>(`/api/sales/debit-notes/${id}/lines`);
export const getSalesInvoiceDebitNotes = (invoiceId: string) => request<SalesDebitNote[]>(`/api/sales/invoices/${invoiceId}/debit-notes`);
export const createDebitNoteFromInvoice = (invoiceId: string, input: Record<string, unknown>) => request<SalesDebitNote>(`/api/sales/invoices/${invoiceId}/create-debit-note`, { method: "POST", body: JSON.stringify(input) });

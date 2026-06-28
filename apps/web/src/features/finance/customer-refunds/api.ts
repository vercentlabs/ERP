export type PageResult<T> = { rows: T[]; total: number; page: number; pageSize: number };
export type CustomerRefundStatus = "DRAFT" | "POSTED" | "CANCELLED";
export type RefundPaymentMethod = "CASH" | "BANK_TRANSFER" | "CHEQUE" | "UPI" | "CARD" | "OTHER";
export type CustomerRefundAllocation = { id: string; refundId: string; creditNoteId: string; amount: number; createdAt: string; updatedAt: string };
export type CustomerRefund = { id: string; refundNumber: string; customerId: string; partyId?: string; refundDate: string; postingDate?: string; status: CustomerRefundStatus; paymentMethod: RefundPaymentMethod; depositAccountId: string; totalAmount: number; referenceNumber?: string; notes?: string; journalEntryId?: string; postedAt?: string; cancelledAt?: string; allocations: CustomerRefundAllocation[] };

const apiBaseUrl = process.env.VERCENT_API_BASE_URL ?? "http://localhost:4000";
const tenantId = process.env.VERCENT_TENANT_ID ?? "demo-tenant";
function apiUrl(path: string, params?: Record<string, string | undefined>) { const url = new URL(path, apiBaseUrl); for (const [key, value] of Object.entries(params ?? {})) if (value) url.searchParams.set(key, value); return url; }
async function request<T>(path: string, init?: RequestInit, params?: Record<string, string | undefined>) {
  const response = await fetch(apiUrl(path, params), { ...init, cache: "no-store", headers: { "content-type": "application/json", "x-tenant-id": tenantId, "x-permissions": "*", ...(init?.headers ?? {}) } });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}

export const listCustomerRefunds = (params: Record<string, string | undefined> = {}) => request<PageResult<CustomerRefund>>("/api/finance/customer-refunds", undefined, params);
export const getCustomerRefund = (id: string) => request<CustomerRefund>(`/api/finance/customer-refunds/${id}`);
export const createCustomerRefund = (input: Record<string, unknown>) => request<CustomerRefund>("/api/finance/customer-refunds", { method: "POST", body: JSON.stringify(input) });
export const updateCustomerRefund = (id: string, input: Record<string, unknown>) => request<CustomerRefund>(`/api/finance/customer-refunds/${id}`, { method: "PATCH", body: JSON.stringify(input) });
export const deleteCustomerRefund = (id: string) => request<CustomerRefund>(`/api/finance/customer-refunds/${id}`, { method: "DELETE" });
export const postCustomerRefund = (id: string, input: Record<string, unknown>) => request<{ refund: CustomerRefund; journalEntry: { id: string; journalNumber: string } }>(`/api/finance/customer-refunds/${id}/post`, { method: "POST", body: JSON.stringify(input) });
export const cancelCustomerRefund = (id: string) => request<CustomerRefund>(`/api/finance/customer-refunds/${id}/cancel`, { method: "POST", body: JSON.stringify({}) });
export const getCustomerRefundAllocations = (id: string) => request<CustomerRefundAllocation[]>(`/api/finance/customer-refunds/${id}/allocations`);
export const getSalesCreditNoteRefunds = (creditNoteId: string) => request<CustomerRefund[]>(`/api/sales/credit-notes/${creditNoteId}/refunds`);
export const createSalesCreditNoteRefund = (creditNoteId: string, input: Record<string, unknown>) => request<CustomerRefund>(`/api/sales/credit-notes/${creditNoteId}/create-refund`, { method: "POST", body: JSON.stringify(input) });

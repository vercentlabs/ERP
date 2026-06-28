export type PageResult<T> = { rows: T[]; total: number; page: number; pageSize: number };
export type CustomerReceiptStatus = "DRAFT" | "POSTED" | "CANCELLED";
export type PaymentMethod = "CASH" | "BANK_TRANSFER" | "CHEQUE" | "UPI" | "CARD" | "OTHER";
export type CustomerReceiptAllocation = { id: string; receiptId: string; salesInvoiceId: string; invoiceNumber: string; invoiceTotalAmount: number; invoiceAmountDueBefore: number; allocatedAmount: number; invoiceAmountDueAfter: number };
export type CustomerReceipt = { id: string; receiptNumber: string; customerId: string; partyId?: string; receiptDate: string; postingDate?: string; status: CustomerReceiptStatus; paymentMethod: PaymentMethod; depositAccountId: string; referenceNumber?: string; referenceDate?: string; amountReceived: number; allocatedAmount: number; currency: string; exchangeRate: number; journalEntryId?: string; postedAt?: string; cancelledAt?: string; notes?: string; allocations: CustomerReceiptAllocation[] };

const apiBaseUrl = process.env.VERCENT_API_BASE_URL ?? "http://localhost:4000";
const tenantId = process.env.VERCENT_TENANT_ID ?? "demo-tenant";
function apiUrl(path: string, params?: Record<string, string | undefined>) { const url = new URL(path, apiBaseUrl); for (const [key, value] of Object.entries(params ?? {})) if (value) url.searchParams.set(key, value); return url; }
async function request<T>(path: string, init?: RequestInit, params?: Record<string, string | undefined>) {
  const response = await fetch(apiUrl(path, params), { ...init, cache: "no-store", headers: { "content-type": "application/json", "x-tenant-id": tenantId, "x-permissions": "*", ...(init?.headers ?? {}) } });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}

export const listCustomerReceipts = (params: Record<string, string | undefined> = {}) => request<PageResult<CustomerReceipt>>("/api/finance/customer-receipts", undefined, params);
export const getCustomerReceipt = (id: string) => request<CustomerReceipt>(`/api/finance/customer-receipts/${id}`);
export const createCustomerReceipt = (input: Record<string, unknown>) => request<CustomerReceipt>("/api/finance/customer-receipts", { method: "POST", body: JSON.stringify(input) });
export const updateCustomerReceipt = (id: string, input: Record<string, unknown>) => request<CustomerReceipt>(`/api/finance/customer-receipts/${id}`, { method: "PATCH", body: JSON.stringify(input) });
export const deleteCustomerReceipt = (id: string) => request<CustomerReceipt>(`/api/finance/customer-receipts/${id}`, { method: "DELETE" });
export const postCustomerReceipt = (id: string, input: Record<string, unknown>) => request<{ receipt: CustomerReceipt; journalEntry: { id: string; journalNumber: string } }>(`/api/finance/customer-receipts/${id}/post`, { method: "POST", body: JSON.stringify(input) });
export const cancelCustomerReceipt = (id: string) => request<CustomerReceipt>(`/api/finance/customer-receipts/${id}/cancel`, { method: "POST", body: JSON.stringify({}) });
export const getCustomerReceiptAllocations = (id: string) => request<CustomerReceiptAllocation[]>(`/api/finance/customer-receipts/${id}/allocations`);
export const getSalesInvoiceReceipts = (invoiceId: string) => request<CustomerReceipt[]>(`/api/sales/invoices/${invoiceId}/receipts`);
export const createSalesInvoiceReceipt = (invoiceId: string, input: Record<string, unknown>) => request<CustomerReceipt>(`/api/sales/invoices/${invoiceId}/create-receipt`, { method: "POST", body: JSON.stringify(input) });

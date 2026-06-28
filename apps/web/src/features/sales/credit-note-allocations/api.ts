export type CreditNoteAllocationTargetType = "SALES_INVOICE" | "SALES_DEBIT_NOTE";
export type CreditNoteAllocation = { id: string; creditNoteId: string; targetType: CreditNoteAllocationTargetType; targetId: string; customerId: string; allocationDate: string; amount: number; notes?: string; createdAt: string; updatedAt: string };

const apiBaseUrl = process.env.VERCENT_API_BASE_URL ?? "http://localhost:4000";
const tenantId = process.env.VERCENT_TENANT_ID ?? "demo-tenant";
function apiUrl(path: string) { return new URL(path, apiBaseUrl); }
async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(apiUrl(path), { ...init, cache: "no-store", headers: { "content-type": "application/json", "x-tenant-id": tenantId, "x-permissions": "*", ...(init?.headers ?? {}) } });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}

export const allocateSalesCreditNote = (creditNoteId: string, input: Record<string, unknown>) => request<CreditNoteAllocation>(`/api/sales/credit-notes/${creditNoteId}/allocate`, { method: "POST", body: JSON.stringify(input) });
export const getSalesCreditNoteAllocations = (creditNoteId: string) => request<CreditNoteAllocation[]>(`/api/sales/credit-notes/${creditNoteId}/allocations`);
export const getSalesInvoiceCreditAllocations = (invoiceId: string) => request<CreditNoteAllocation[]>(`/api/sales/invoices/${invoiceId}/credit-allocations`);
export const getSalesDebitNoteCreditAllocations = (debitNoteId: string) => request<CreditNoteAllocation[]>(`/api/sales/debit-notes/${debitNoteId}/credit-allocations`);

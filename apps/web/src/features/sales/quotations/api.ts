export type QuotationStatus = "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED" | "CANCELLED";

export type PageResult<T> = {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type QuotationLineRecord = {
  id: string;
  quotationId: string;
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

export type QuotationRecord = {
  id: string;
  quotationNumber: string;
  customerId: string;
  partyId?: string;
  opportunityId?: string;
  quoteDate: string;
  validUntil: string;
  status: QuotationStatus;
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
  rejectionReason?: string;
  ownerUserId?: string;
  assignedTeamId?: string;
  acceptedAt?: string;
  rejectedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
  lines: QuotationLineRecord[];
};

export type QuotationStats = {
  draftValue: number;
  sentValue: number;
  acceptedValue: number;
  rejectedExpiredValue: number;
};

export type QuotationListParams = {
  search?: string;
  status?: string;
  customerId?: string;
  opportunityId?: string;
  page?: string;
  pageSize?: string;
};

const apiBaseUrl = process.env.VERCENT_API_BASE_URL ?? "http://localhost:4000";
const tenantId = process.env.VERCENT_TENANT_ID ?? "demo-tenant";

function apiUrl(path: string, params?: Record<string, string | undefined>) {
  const url = new URL(path, apiBaseUrl);
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value) url.searchParams.set(key, value);
  }
  return url;
}

async function request<T>(path: string, init?: RequestInit, params?: Record<string, string | undefined>) {
  const response = await fetch(apiUrl(path, params), {
    ...init,
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      "x-tenant-id": tenantId,
      "x-permissions": "*",
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json() as Promise<T>;
}

export function listQuotations(params: QuotationListParams) {
  return request<PageResult<QuotationRecord>>("/api/sales/quotations", undefined, { ...params, pageSize: params.pageSize ?? "25" });
}

export function getQuotationStats(params: QuotationListParams = {}) {
  return request<QuotationStats>("/api/sales/quotations/stats", undefined, params);
}

export function getQuotation(id: string) {
  return request<QuotationRecord>(`/api/sales/quotations/${id}`);
}

export function createQuotation(input: Record<string, unknown>) {
  return request<QuotationRecord>("/api/sales/quotations", { method: "POST", body: JSON.stringify(input) });
}

export function updateQuotation(id: string, input: Record<string, unknown>) {
  return request<QuotationRecord>(`/api/sales/quotations/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function changeQuotationStatus(id: string, input: { status: QuotationStatus; rejectionReason?: string }) {
  return request<QuotationRecord>(`/api/sales/quotations/${id}/status`, { method: "POST", body: JSON.stringify(input) });
}

export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "DISQUALIFIED" | "CONVERTED";

export type PageResult<T> = {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type LeadRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  branchId?: string;
  leadNumber: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  email?: string;
  phone?: string;
  source?: string;
  status: LeadStatus;
  score: number;
  ownerUserId?: string;
  assignedTeamId?: string;
  expectedValue?: number;
  currency: string;
  notes?: string;
  tags: string[];
  customFields: Record<string, unknown>;
  convertedPartyId?: string;
  convertedCustomerId?: string;
  convertedOpportunityId?: string;
  convertedAt?: string;
  convertedByUserId?: string;
  conversionNotes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type LeadConversionResult = {
  lead: LeadRecord;
  party: {
    id: string;
    partyNumber: string;
    displayName: string;
  };
  customer: {
    id: string;
    customerNumber: string;
    partyId: string;
  };
  addresses: Array<{ id: string; addressType: string }>;
  opportunity: null | {
    id: string;
    opportunityNumber: string;
    name: string;
  };
  summary: {
    leadId: string;
    partyId: string;
    customerId: string;
    convertedAt?: string;
  };
};

export type LeadStats = {
  total: number;
  byStatus: Record<LeadStatus, number>;
  totalExpectedValue: number;
  averageScore: number;
};

export type LeadListParams = {
  search?: string;
  status?: string;
  source?: string;
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

export function listLeads(params: LeadListParams) {
  return request<PageResult<LeadRecord>>("/api/crm/leads", undefined, {
    ...params,
    pageSize: params.pageSize ?? "25",
  });
}

export function getLead(id: string) {
  return request<LeadRecord>(`/api/crm/leads/${id}`);
}

export function getLeadStats(params: LeadListParams = {}) {
  return request<LeadStats>("/api/crm/leads/stats", undefined, params);
}

export function createLead(input: Record<string, unknown>) {
  return request<LeadRecord>("/api/crm/leads", { method: "POST", body: JSON.stringify(input) });
}

export function updateLead(id: string, input: Record<string, unknown>) {
  return request<LeadRecord>(`/api/crm/leads/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function changeLeadStatus(id: string, status: LeadStatus) {
  return request<LeadRecord>(`/api/crm/leads/${id}/status`, { method: "POST", body: JSON.stringify({ status }) });
}

export function assignLead(id: string, input: { ownerUserId?: string; assignedTeamId?: string }) {
  return request<LeadRecord>(`/api/crm/leads/${id}/assign`, { method: "POST", body: JSON.stringify(input) });
}

export function convertLead(id: string, input: Record<string, unknown>) {
  return request<LeadConversionResult>(`/api/crm/leads/${id}/convert`, { method: "POST", body: JSON.stringify(input) });
}

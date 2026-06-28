export type OpportunityStage = "PROSPECTING" | "QUALIFICATION" | "PROPOSAL" | "NEGOTIATION" | "WON" | "LOST";

export type PageResult<T> = {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type OpportunityRecord = {
  id: string;
  tenantId: string;
  companyId?: string;
  branchId?: string;
  opportunityNumber: string;
  name: string;
  customerId: string;
  partyId?: string;
  leadId?: string;
  ownerUserId?: string;
  assignedTeamId?: string;
  stage: OpportunityStage;
  probability: number;
  expectedValue: number;
  currency: string;
  expectedCloseDate?: string;
  source?: string;
  lossReason?: string;
  notes?: string;
  tags: string[];
  customFields: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  closedAt?: string;
};

export type OpportunityListParams = {
  search?: string;
  stage?: string;
  customerId?: string;
  ownerUserId?: string;
  page?: string;
  pageSize?: string;
};

export type PipelineSummary = {
  openCount: number;
  openValue: number;
  weightedValue: number;
  wonValue: number;
  lostValue: number;
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

export function listOpportunities(params: OpportunityListParams) {
  return request<PageResult<OpportunityRecord>>("/api/crm/opportunities", undefined, {
    ...params,
    pageSize: params.pageSize ?? "25",
  });
}

export function getPipelineSummary(params: OpportunityListParams = {}) {
  return request<PipelineSummary>("/api/crm/opportunities/pipeline-summary", undefined, params);
}

export function getOpportunity(id: string) {
  return request<OpportunityRecord>(`/api/crm/opportunities/${id}`);
}

export function createOpportunity(input: Record<string, unknown>) {
  return request<OpportunityRecord>("/api/crm/opportunities", { method: "POST", body: JSON.stringify(input) });
}

export function updateOpportunity(id: string, input: Record<string, unknown>) {
  return request<OpportunityRecord>(`/api/crm/opportunities/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function changeOpportunityStage(id: string, input: { stage: OpportunityStage; lossReason?: string }) {
  return request<OpportunityRecord>(`/api/crm/opportunities/${id}/stage`, { method: "POST", body: JSON.stringify(input) });
}

export function assignOpportunity(id: string, input: { ownerUserId?: string; assignedTeamId?: string }) {
  return request<OpportunityRecord>(`/api/crm/opportunities/${id}/assign`, { method: "POST", body: JSON.stringify(input) });
}

import type { ActorContext, BranchId, CompanyId, PageRequest, PageResult, TenantId, UserId } from "@vercent/shared-types";

export const opportunityStages = ["PROSPECTING", "QUALIFICATION", "PROPOSAL", "NEGOTIATION", "WON", "LOST"] as const;
export type OpportunityStage = (typeof opportunityStages)[number];

export type OpportunitySortField = "created_at" | "updated_at" | "expected_value" | "expected_close_date" | "probability";
export type SortDirection = "asc" | "desc";

export type OpportunityRecord = {
  id: string;
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  opportunityNumber: string;
  name: string;
  customerId: string;
  partyId?: string;
  leadId?: string;
  ownerUserId?: UserId;
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

export type OpportunityCreateInput = {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  opportunityNumber?: string;
  name: string;
  customerId: string;
  partyId?: string;
  leadId?: string;
  ownerUserId?: UserId;
  assignedTeamId?: string;
  stage?: OpportunityStage;
  probability?: number;
  expectedValue?: number;
  currency?: string;
  expectedCloseDate?: string;
  source?: string;
  lossReason?: string;
  notes?: string;
  tags?: string[];
  customFields?: Record<string, unknown>;
};

export type OpportunityUpdateInput = Partial<Omit<OpportunityCreateInput, "tenantId" | "opportunityNumber" | "customerId">> & {
  customerId?: string;
};

export type OpportunityListRequest = PageRequest & {
  tenantId: TenantId;
  companyId?: CompanyId;
  branchId?: BranchId;
  stage?: OpportunityStage;
  customerId?: string;
  ownerUserId?: UserId;
  assignedTeamId?: string;
  source?: string;
  createdFrom?: string;
  createdTo?: string;
  expectedCloseFrom?: string;
  expectedCloseTo?: string;
  sortBy?: OpportunitySortField;
  sortDirection?: SortDirection;
};

export type OpportunityStageChangeInput = {
  stage: OpportunityStage;
  probability?: number;
  lossReason?: string;
};

export type OpportunityAssignmentInput = {
  ownerUserId?: UserId;
  assignedTeamId?: string;
};

export type OpportunityStats = {
  total: number;
  byStage: Record<OpportunityStage, number>;
  openValue: number;
  wonValue: number;
  lostValue: number;
};

export type PipelineSummary = {
  openCount: number;
  openValue: number;
  weightedValue: number;
  wonValue: number;
  lostValue: number;
  byStage: Record<OpportunityStage, { count: number; value: number; weightedValue: number }>;
};

export type ForecastSummary = {
  currency: string;
  opportunityCount: number;
  pipelineValue: number;
  weightedValue: number;
  expectedCloseFrom?: string;
  expectedCloseTo?: string;
};

export type OpportunityActionContext = ActorContext & {
  reason?: string;
};

export type OpportunityRepository = {
  createOpportunity(input: OpportunityCreateInput, actorId?: string): Promise<OpportunityRecord>;
  listOpportunities(request: OpportunityListRequest): Promise<PageResult<OpportunityRecord>>;
  getOpportunityById(tenantId: string, id: string): Promise<OpportunityRecord | undefined>;
  getOpportunityByNumber(tenantId: string, opportunityNumber: string, companyId?: string): Promise<OpportunityRecord | undefined>;
  updateOpportunity(tenantId: string, id: string, input: OpportunityUpdateInput, actorId?: string): Promise<OpportunityRecord | undefined>;
  softDeleteOpportunity(tenantId: string, id: string, actorId?: string): Promise<OpportunityRecord | undefined>;
  changeOpportunityStage(
    tenantId: string,
    id: string,
    input: OpportunityStageChangeInput,
    actorId?: string,
  ): Promise<OpportunityRecord | undefined>;
  assignOpportunity(
    tenantId: string,
    id: string,
    input: OpportunityAssignmentInput,
    actorId?: string,
  ): Promise<OpportunityRecord | undefined>;
  searchOpportunities(request: OpportunityListRequest): Promise<PageResult<OpportunityRecord>>;
  getOpportunityStats(tenantId: string, filters?: Pick<OpportunityListRequest, "companyId" | "branchId" | "ownerUserId" | "source">): Promise<OpportunityStats>;
  getPipelineSummary(tenantId: string, filters?: Pick<OpportunityListRequest, "companyId" | "branchId" | "ownerUserId" | "source">): Promise<PipelineSummary>;
  getForecastSummary(tenantId: string, filters?: Pick<OpportunityListRequest, "companyId" | "branchId" | "ownerUserId" | "source" | "expectedCloseFrom" | "expectedCloseTo">): Promise<ForecastSummary>;
};

export type OpportunitiesRecord = OpportunityRecord;
export type OpportunitiesCreateInput = OpportunityCreateInput;
export type OpportunitiesUpdateInput = OpportunityUpdateInput;
export type OpportunitiesListRequest = OpportunityListRequest;
export type OpportunitiesActionContext = OpportunityActionContext;
export type OpportunitiesStatus = OpportunityStage;

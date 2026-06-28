import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type LeadScoringRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type LeadScoringCreateInput = {
  tenantId: string;
  companyId?: string;
  branchId?: string;
  code: string;
  name: string;
  description?: string;
  amount?: number;
  priority?: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  ownerId?: string;
  source?: string;
  customFields?: Record<string, unknown>;
};

export type LeadScoringUpdateInput = Partial<Omit<LeadScoringCreateInput, "tenantId" | "code">>;

export type LeadScoringListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: LeadScoringRecord["priority"];
};

export type LeadScoringActionContext = ActorContext & {
  reason?: string;
};

export type LeadScoringStatus = DocumentStatus;

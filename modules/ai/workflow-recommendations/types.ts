import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type WorkflowRecommendationsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type WorkflowRecommendationsCreateInput = {
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

export type WorkflowRecommendationsUpdateInput = Partial<Omit<WorkflowRecommendationsCreateInput, "tenantId" | "code">>;

export type WorkflowRecommendationsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: WorkflowRecommendationsRecord["priority"];
};

export type WorkflowRecommendationsActionContext = ActorContext & {
  reason?: string;
};

export type WorkflowRecommendationsStatus = DocumentStatus;

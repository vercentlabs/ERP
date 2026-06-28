import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ResourcePlanningRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ResourcePlanningCreateInput = {
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

export type ResourcePlanningUpdateInput = Partial<Omit<ResourcePlanningCreateInput, "tenantId" | "code">>;

export type ResourcePlanningListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ResourcePlanningRecord["priority"];
};

export type ResourcePlanningActionContext = ActorContext & {
  reason?: string;
};

export type ResourcePlanningStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DemandPlanningRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DemandPlanningCreateInput = {
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

export type DemandPlanningUpdateInput = Partial<Omit<DemandPlanningCreateInput, "tenantId" | "code">>;

export type DemandPlanningListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DemandPlanningRecord["priority"];
};

export type DemandPlanningActionContext = ActorContext & {
  reason?: string;
};

export type DemandPlanningStatus = DocumentStatus;

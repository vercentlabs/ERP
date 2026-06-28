import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CapacityPlanningRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CapacityPlanningCreateInput = {
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

export type CapacityPlanningUpdateInput = Partial<Omit<CapacityPlanningCreateInput, "tenantId" | "code">>;

export type CapacityPlanningListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CapacityPlanningRecord["priority"];
};

export type CapacityPlanningActionContext = ActorContext & {
  reason?: string;
};

export type CapacityPlanningStatus = DocumentStatus;

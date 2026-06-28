import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PlanningRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PlanningCreateInput = {
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

export type PlanningUpdateInput = Partial<Omit<PlanningCreateInput, "tenantId" | "code">>;

export type PlanningListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PlanningRecord["priority"];
};

export type PlanningActionContext = ActorContext & {
  reason?: string;
};

export type PlanningStatus = DocumentStatus;

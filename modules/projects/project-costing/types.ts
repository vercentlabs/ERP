import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProjectCostingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProjectCostingCreateInput = {
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

export type ProjectCostingUpdateInput = Partial<Omit<ProjectCostingCreateInput, "tenantId" | "code">>;

export type ProjectCostingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProjectCostingRecord["priority"];
};

export type ProjectCostingActionContext = ActorContext & {
  reason?: string;
};

export type ProjectCostingStatus = DocumentStatus;

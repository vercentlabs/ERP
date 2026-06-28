import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type LifecycleCostingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type LifecycleCostingCreateInput = {
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

export type LifecycleCostingUpdateInput = Partial<Omit<LifecycleCostingCreateInput, "tenantId" | "code">>;

export type LifecycleCostingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: LifecycleCostingRecord["priority"];
};

export type LifecycleCostingActionContext = ActorContext & {
  reason?: string;
};

export type LifecycleCostingStatus = DocumentStatus;

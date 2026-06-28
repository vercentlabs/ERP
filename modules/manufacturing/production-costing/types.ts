import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProductionCostingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProductionCostingCreateInput = {
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

export type ProductionCostingUpdateInput = Partial<Omit<ProductionCostingCreateInput, "tenantId" | "code">>;

export type ProductionCostingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProductionCostingRecord["priority"];
};

export type ProductionCostingActionContext = ActorContext & {
  reason?: string;
};

export type ProductionCostingStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CostCentersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CostCentersCreateInput = {
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

export type CostCentersUpdateInput = Partial<Omit<CostCentersCreateInput, "tenantId" | "code">>;

export type CostCentersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CostCentersRecord["priority"];
};

export type CostCentersActionContext = ActorContext & {
  reason?: string;
};

export type CostCentersStatus = DocumentStatus;

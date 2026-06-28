import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ChartMasterRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ChartMasterCreateInput = {
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

export type ChartMasterUpdateInput = Partial<Omit<ChartMasterCreateInput, "tenantId" | "code">>;

export type ChartMasterListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ChartMasterRecord["priority"];
};

export type ChartMasterActionContext = ActorContext & {
  reason?: string;
};

export type ChartMasterStatus = DocumentStatus;

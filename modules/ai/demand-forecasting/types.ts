import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DemandForecastingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DemandForecastingCreateInput = {
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

export type DemandForecastingUpdateInput = Partial<Omit<DemandForecastingCreateInput, "tenantId" | "code">>;

export type DemandForecastingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DemandForecastingRecord["priority"];
};

export type DemandForecastingActionContext = ActorContext & {
  reason?: string;
};

export type DemandForecastingStatus = DocumentStatus;

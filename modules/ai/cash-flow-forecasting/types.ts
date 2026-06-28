import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CashFlowForecastingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CashFlowForecastingCreateInput = {
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

export type CashFlowForecastingUpdateInput = Partial<Omit<CashFlowForecastingCreateInput, "tenantId" | "code">>;

export type CashFlowForecastingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CashFlowForecastingRecord["priority"];
};

export type CashFlowForecastingActionContext = ActorContext & {
  reason?: string;
};

export type CashFlowForecastingStatus = DocumentStatus;

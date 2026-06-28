import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ForecastingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ForecastingCreateInput = {
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

export type ForecastingUpdateInput = Partial<Omit<ForecastingCreateInput, "tenantId" | "code">>;

export type ForecastingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ForecastingRecord["priority"];
};

export type ForecastingActionContext = ActorContext & {
  reason?: string;
};

export type ForecastingStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ManufacturingAnalyticsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ManufacturingAnalyticsCreateInput = {
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

export type ManufacturingAnalyticsUpdateInput = Partial<Omit<ManufacturingAnalyticsCreateInput, "tenantId" | "code">>;

export type ManufacturingAnalyticsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ManufacturingAnalyticsRecord["priority"];
};

export type ManufacturingAnalyticsActionContext = ActorContext & {
  reason?: string;
};

export type ManufacturingAnalyticsStatus = DocumentStatus;

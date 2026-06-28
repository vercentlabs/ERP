import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ServiceAnalyticsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ServiceAnalyticsCreateInput = {
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

export type ServiceAnalyticsUpdateInput = Partial<Omit<ServiceAnalyticsCreateInput, "tenantId" | "code">>;

export type ServiceAnalyticsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ServiceAnalyticsRecord["priority"];
};

export type ServiceAnalyticsActionContext = ActorContext & {
  reason?: string;
};

export type ServiceAnalyticsStatus = DocumentStatus;

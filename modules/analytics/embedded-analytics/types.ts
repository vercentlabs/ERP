import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type EmbeddedAnalyticsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type EmbeddedAnalyticsCreateInput = {
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

export type EmbeddedAnalyticsUpdateInput = Partial<Omit<EmbeddedAnalyticsCreateInput, "tenantId" | "code">>;

export type EmbeddedAnalyticsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: EmbeddedAnalyticsRecord["priority"];
};

export type EmbeddedAnalyticsActionContext = ActorContext & {
  reason?: string;
};

export type EmbeddedAnalyticsStatus = DocumentStatus;

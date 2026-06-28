import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type MetricsLayerRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type MetricsLayerCreateInput = {
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

export type MetricsLayerUpdateInput = Partial<Omit<MetricsLayerCreateInput, "tenantId" | "code">>;

export type MetricsLayerListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: MetricsLayerRecord["priority"];
};

export type MetricsLayerActionContext = ActorContext & {
  reason?: string;
};

export type MetricsLayerStatus = DocumentStatus;

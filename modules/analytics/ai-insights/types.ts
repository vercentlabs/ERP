import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AiInsightsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AiInsightsCreateInput = {
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

export type AiInsightsUpdateInput = Partial<Omit<AiInsightsCreateInput, "tenantId" | "code">>;

export type AiInsightsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AiInsightsRecord["priority"];
};

export type AiInsightsActionContext = ActorContext & {
  reason?: string;
};

export type AiInsightsStatus = DocumentStatus;

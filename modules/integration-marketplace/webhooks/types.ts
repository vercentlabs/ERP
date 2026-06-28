import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type WebhooksRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type WebhooksCreateInput = {
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

export type WebhooksUpdateInput = Partial<Omit<WebhooksCreateInput, "tenantId" | "code">>;

export type WebhooksListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: WebhooksRecord["priority"];
};

export type WebhooksActionContext = ActorContext & {
  reason?: string;
};

export type WebhooksStatus = DocumentStatus;

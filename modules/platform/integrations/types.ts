import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type IntegrationsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type IntegrationsCreateInput = {
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

export type IntegrationsUpdateInput = Partial<Omit<IntegrationsCreateInput, "tenantId" | "code">>;

export type IntegrationsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: IntegrationsRecord["priority"];
};

export type IntegrationsActionContext = ActorContext & {
  reason?: string;
};

export type IntegrationsStatus = DocumentStatus;

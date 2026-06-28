import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProjectBillingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProjectBillingCreateInput = {
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

export type ProjectBillingUpdateInput = Partial<Omit<ProjectBillingCreateInput, "tenantId" | "code">>;

export type ProjectBillingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProjectBillingRecord["priority"];
};

export type ProjectBillingActionContext = ActorContext & {
  reason?: string;
};

export type ProjectBillingStatus = DocumentStatus;

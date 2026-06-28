import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CustomWorkflowsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CustomWorkflowsCreateInput = {
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

export type CustomWorkflowsUpdateInput = Partial<Omit<CustomWorkflowsCreateInput, "tenantId" | "code">>;

export type CustomWorkflowsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CustomWorkflowsRecord["priority"];
};

export type CustomWorkflowsActionContext = ActorContext & {
  reason?: string;
};

export type CustomWorkflowsStatus = DocumentStatus;

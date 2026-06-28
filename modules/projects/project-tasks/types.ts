import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProjectTasksRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProjectTasksCreateInput = {
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

export type ProjectTasksUpdateInput = Partial<Omit<ProjectTasksCreateInput, "tenantId" | "code">>;

export type ProjectTasksListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProjectTasksRecord["priority"];
};

export type ProjectTasksActionContext = ActorContext & {
  reason?: string;
};

export type ProjectTasksStatus = DocumentStatus;

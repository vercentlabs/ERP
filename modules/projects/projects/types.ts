import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProjectsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProjectsCreateInput = {
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

export type ProjectsUpdateInput = Partial<Omit<ProjectsCreateInput, "tenantId" | "code">>;

export type ProjectsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProjectsRecord["priority"];
};

export type ProjectsActionContext = ActorContext & {
  reason?: string;
};

export type ProjectsStatus = DocumentStatus;

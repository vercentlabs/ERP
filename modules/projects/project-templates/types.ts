import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProjectTemplatesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProjectTemplatesCreateInput = {
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

export type ProjectTemplatesUpdateInput = Partial<Omit<ProjectTemplatesCreateInput, "tenantId" | "code">>;

export type ProjectTemplatesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProjectTemplatesRecord["priority"];
};

export type ProjectTemplatesActionContext = ActorContext & {
  reason?: string;
};

export type ProjectTemplatesStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ActivitiesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ActivitiesCreateInput = {
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

export type ActivitiesUpdateInput = Partial<Omit<ActivitiesCreateInput, "tenantId" | "code">>;

export type ActivitiesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ActivitiesRecord["priority"];
};

export type ActivitiesActionContext = ActorContext & {
  reason?: string;
};

export type ActivitiesStatus = DocumentStatus;

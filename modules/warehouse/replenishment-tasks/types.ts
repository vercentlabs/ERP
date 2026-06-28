import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ReplenishmentTasksRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ReplenishmentTasksCreateInput = {
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

export type ReplenishmentTasksUpdateInput = Partial<Omit<ReplenishmentTasksCreateInput, "tenantId" | "code">>;

export type ReplenishmentTasksListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ReplenishmentTasksRecord["priority"];
};

export type ReplenishmentTasksActionContext = ActorContext & {
  reason?: string;
};

export type ReplenishmentTasksStatus = DocumentStatus;

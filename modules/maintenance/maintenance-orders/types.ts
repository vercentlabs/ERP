import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type MaintenanceOrdersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type MaintenanceOrdersCreateInput = {
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

export type MaintenanceOrdersUpdateInput = Partial<Omit<MaintenanceOrdersCreateInput, "tenantId" | "code">>;

export type MaintenanceOrdersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: MaintenanceOrdersRecord["priority"];
};

export type MaintenanceOrdersActionContext = ActorContext & {
  reason?: string;
};

export type MaintenanceOrdersStatus = DocumentStatus;

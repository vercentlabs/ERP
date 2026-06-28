import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CustomDashboardsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CustomDashboardsCreateInput = {
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

export type CustomDashboardsUpdateInput = Partial<Omit<CustomDashboardsCreateInput, "tenantId" | "code">>;

export type CustomDashboardsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CustomDashboardsRecord["priority"];
};

export type CustomDashboardsActionContext = ActorContext & {
  reason?: string;
};

export type CustomDashboardsStatus = DocumentStatus;

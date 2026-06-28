import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DashboardsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DashboardsCreateInput = {
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

export type DashboardsUpdateInput = Partial<Omit<DashboardsCreateInput, "tenantId" | "code">>;

export type DashboardsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DashboardsRecord["priority"];
};

export type DashboardsActionContext = ActorContext & {
  reason?: string;
};

export type DashboardsStatus = DocumentStatus;

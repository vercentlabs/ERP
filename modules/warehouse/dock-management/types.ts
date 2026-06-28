import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DockManagementRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DockManagementCreateInput = {
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

export type DockManagementUpdateInput = Partial<Omit<DockManagementCreateInput, "tenantId" | "code">>;

export type DockManagementListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DockManagementRecord["priority"];
};

export type DockManagementActionContext = ActorContext & {
  reason?: string;
};

export type DockManagementStatus = DocumentStatus;

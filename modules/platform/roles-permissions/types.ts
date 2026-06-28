import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type RolesPermissionsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type RolesPermissionsCreateInput = {
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

export type RolesPermissionsUpdateInput = Partial<Omit<RolesPermissionsCreateInput, "tenantId" | "code">>;

export type RolesPermissionsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: RolesPermissionsRecord["priority"];
};

export type RolesPermissionsActionContext = ActorContext & {
  reason?: string;
};

export type RolesPermissionsStatus = DocumentStatus;

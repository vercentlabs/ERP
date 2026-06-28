import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SupplierPortalRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SupplierPortalCreateInput = {
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

export type SupplierPortalUpdateInput = Partial<Omit<SupplierPortalCreateInput, "tenantId" | "code">>;

export type SupplierPortalListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SupplierPortalRecord["priority"];
};

export type SupplierPortalActionContext = ActorContext & {
  reason?: string;
};

export type SupplierPortalStatus = DocumentStatus;

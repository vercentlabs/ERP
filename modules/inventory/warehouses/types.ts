import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type WarehousesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type WarehousesCreateInput = {
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

export type WarehousesUpdateInput = Partial<Omit<WarehousesCreateInput, "tenantId" | "code">>;

export type WarehousesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: WarehousesRecord["priority"];
};

export type WarehousesActionContext = ActorContext & {
  reason?: string;
};

export type WarehousesStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DataWarehouseRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DataWarehouseCreateInput = {
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

export type DataWarehouseUpdateInput = Partial<Omit<DataWarehouseCreateInput, "tenantId" | "code">>;

export type DataWarehouseListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DataWarehouseRecord["priority"];
};

export type DataWarehouseActionContext = ActorContext & {
  reason?: string;
};

export type DataWarehouseStatus = DocumentStatus;

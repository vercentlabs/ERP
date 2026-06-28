import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProcessManufacturingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProcessManufacturingCreateInput = {
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

export type ProcessManufacturingUpdateInput = Partial<Omit<ProcessManufacturingCreateInput, "tenantId" | "code">>;

export type ProcessManufacturingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProcessManufacturingRecord["priority"];
};

export type ProcessManufacturingActionContext = ActorContext & {
  reason?: string;
};

export type ProcessManufacturingStatus = DocumentStatus;

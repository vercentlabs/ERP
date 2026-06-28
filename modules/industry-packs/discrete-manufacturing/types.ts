import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DiscreteManufacturingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DiscreteManufacturingCreateInput = {
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

export type DiscreteManufacturingUpdateInput = Partial<Omit<DiscreteManufacturingCreateInput, "tenantId" | "code">>;

export type DiscreteManufacturingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DiscreteManufacturingRecord["priority"];
};

export type DiscreteManufacturingActionContext = ActorContext & {
  reason?: string;
};

export type DiscreteManufacturingStatus = DocumentStatus;

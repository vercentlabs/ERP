import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProductionOrdersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProductionOrdersCreateInput = {
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

export type ProductionOrdersUpdateInput = Partial<Omit<ProductionOrdersCreateInput, "tenantId" | "code">>;

export type ProductionOrdersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProductionOrdersRecord["priority"];
};

export type ProductionOrdersActionContext = ActorContext & {
  reason?: string;
};

export type ProductionOrdersStatus = DocumentStatus;

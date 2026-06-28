import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type EngineeringChangeOrdersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type EngineeringChangeOrdersCreateInput = {
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

export type EngineeringChangeOrdersUpdateInput = Partial<Omit<EngineeringChangeOrdersCreateInput, "tenantId" | "code">>;

export type EngineeringChangeOrdersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: EngineeringChangeOrdersRecord["priority"];
};

export type EngineeringChangeOrdersActionContext = ActorContext & {
  reason?: string;
};

export type EngineeringChangeOrdersStatus = DocumentStatus;

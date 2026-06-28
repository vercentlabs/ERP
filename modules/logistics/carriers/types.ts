import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CarriersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CarriersCreateInput = {
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

export type CarriersUpdateInput = Partial<Omit<CarriersCreateInput, "tenantId" | "code">>;

export type CarriersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CarriersRecord["priority"];
};

export type CarriersActionContext = ActorContext & {
  reason?: string;
};

export type CarriersStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DeliveryRunsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DeliveryRunsCreateInput = {
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

export type DeliveryRunsUpdateInput = Partial<Omit<DeliveryRunsCreateInput, "tenantId" | "code">>;

export type DeliveryRunsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DeliveryRunsRecord["priority"];
};

export type DeliveryRunsActionContext = ActorContext & {
  reason?: string;
};

export type DeliveryRunsStatus = DocumentStatus;

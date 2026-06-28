import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PurchaseOrdersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PurchaseOrdersCreateInput = {
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

export type PurchaseOrdersUpdateInput = Partial<Omit<PurchaseOrdersCreateInput, "tenantId" | "code">>;

export type PurchaseOrdersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PurchaseOrdersRecord["priority"];
};

export type PurchaseOrdersActionContext = ActorContext & {
  reason?: string;
};

export type PurchaseOrdersStatus = DocumentStatus;

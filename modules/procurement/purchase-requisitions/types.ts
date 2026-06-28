import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PurchaseRequisitionsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PurchaseRequisitionsCreateInput = {
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

export type PurchaseRequisitionsUpdateInput = Partial<Omit<PurchaseRequisitionsCreateInput, "tenantId" | "code">>;

export type PurchaseRequisitionsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PurchaseRequisitionsRecord["priority"];
};

export type PurchaseRequisitionsActionContext = ActorContext & {
  reason?: string;
};

export type PurchaseRequisitionsStatus = DocumentStatus;

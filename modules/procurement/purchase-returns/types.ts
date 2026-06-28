import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PurchaseReturnsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PurchaseReturnsCreateInput = {
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

export type PurchaseReturnsUpdateInput = Partial<Omit<PurchaseReturnsCreateInput, "tenantId" | "code">>;

export type PurchaseReturnsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PurchaseReturnsRecord["priority"];
};

export type PurchaseReturnsActionContext = ActorContext & {
  reason?: string;
};

export type PurchaseReturnsStatus = DocumentStatus;

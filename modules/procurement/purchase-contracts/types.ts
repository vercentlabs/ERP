import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PurchaseContractsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PurchaseContractsCreateInput = {
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

export type PurchaseContractsUpdateInput = Partial<Omit<PurchaseContractsCreateInput, "tenantId" | "code">>;

export type PurchaseContractsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PurchaseContractsRecord["priority"];
};

export type PurchaseContractsActionContext = ActorContext & {
  reason?: string;
};

export type PurchaseContractsStatus = DocumentStatus;

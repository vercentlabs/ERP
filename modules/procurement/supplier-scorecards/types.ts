import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SupplierScorecardsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SupplierScorecardsCreateInput = {
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

export type SupplierScorecardsUpdateInput = Partial<Omit<SupplierScorecardsCreateInput, "tenantId" | "code">>;

export type SupplierScorecardsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SupplierScorecardsRecord["priority"];
};

export type SupplierScorecardsActionContext = ActorContext & {
  reason?: string;
};

export type SupplierScorecardsStatus = DocumentStatus;

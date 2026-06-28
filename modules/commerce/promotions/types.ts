import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PromotionsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PromotionsCreateInput = {
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

export type PromotionsUpdateInput = Partial<Omit<PromotionsCreateInput, "tenantId" | "code">>;

export type PromotionsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PromotionsRecord["priority"];
};

export type PromotionsActionContext = ActorContext & {
  reason?: string;
};

export type PromotionsStatus = DocumentStatus;

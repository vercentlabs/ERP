import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DiscountsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DiscountsCreateInput = {
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

export type DiscountsUpdateInput = Partial<Omit<DiscountsCreateInput, "tenantId" | "code">>;

export type DiscountsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DiscountsRecord["priority"];
};

export type DiscountsActionContext = ActorContext & {
  reason?: string;
};

export type DiscountsStatus = DocumentStatus;

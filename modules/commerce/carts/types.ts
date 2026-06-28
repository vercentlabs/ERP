import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CartsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CartsCreateInput = {
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

export type CartsUpdateInput = Partial<Omit<CartsCreateInput, "tenantId" | "code">>;

export type CartsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CartsRecord["priority"];
};

export type CartsActionContext = ActorContext & {
  reason?: string;
};

export type CartsStatus = DocumentStatus;

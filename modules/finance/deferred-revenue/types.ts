import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DeferredRevenueRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DeferredRevenueCreateInput = {
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

export type DeferredRevenueUpdateInput = Partial<Omit<DeferredRevenueCreateInput, "tenantId" | "code">>;

export type DeferredRevenueListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DeferredRevenueRecord["priority"];
};

export type DeferredRevenueActionContext = ActorContext & {
  reason?: string;
};

export type DeferredRevenueStatus = DocumentStatus;

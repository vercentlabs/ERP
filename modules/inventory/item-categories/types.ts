import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ItemCategoriesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ItemCategoriesCreateInput = {
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

export type ItemCategoriesUpdateInput = Partial<Omit<ItemCategoriesCreateInput, "tenantId" | "code">>;

export type ItemCategoriesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ItemCategoriesRecord["priority"];
};

export type ItemCategoriesActionContext = ActorContext & {
  reason?: string;
};

export type ItemCategoriesStatus = DocumentStatus;

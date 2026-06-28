import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type FoodAndBeverageRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type FoodAndBeverageCreateInput = {
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

export type FoodAndBeverageUpdateInput = Partial<Omit<FoodAndBeverageCreateInput, "tenantId" | "code">>;

export type FoodAndBeverageListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: FoodAndBeverageRecord["priority"];
};

export type FoodAndBeverageActionContext = ActorContext & {
  reason?: string;
};

export type FoodAndBeverageStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type BudgetingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type BudgetingCreateInput = {
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

export type BudgetingUpdateInput = Partial<Omit<BudgetingCreateInput, "tenantId" | "code">>;

export type BudgetingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: BudgetingRecord["priority"];
};

export type BudgetingActionContext = ActorContext & {
  reason?: string;
};

export type BudgetingStatus = DocumentStatus;

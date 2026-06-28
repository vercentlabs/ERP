import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type BudgetsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type BudgetsCreateInput = {
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

export type BudgetsUpdateInput = Partial<Omit<BudgetsCreateInput, "tenantId" | "code">>;

export type BudgetsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: BudgetsRecord["priority"];
};

export type BudgetsActionContext = ActorContext & {
  reason?: string;
};

export type BudgetsStatus = DocumentStatus;

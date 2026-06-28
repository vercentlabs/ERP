import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ExpensesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ExpensesCreateInput = {
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

export type ExpensesUpdateInput = Partial<Omit<ExpensesCreateInput, "tenantId" | "code">>;

export type ExpensesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ExpensesRecord["priority"];
};

export type ExpensesActionContext = ActorContext & {
  reason?: string;
};

export type ExpensesStatus = DocumentStatus;

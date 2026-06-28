import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type FinancialReportsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type FinancialReportsCreateInput = {
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

export type FinancialReportsUpdateInput = Partial<Omit<FinancialReportsCreateInput, "tenantId" | "code">>;

export type FinancialReportsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: FinancialReportsRecord["priority"];
};

export type FinancialReportsActionContext = ActorContext & {
  reason?: string;
};

export type FinancialReportsStatus = DocumentStatus;

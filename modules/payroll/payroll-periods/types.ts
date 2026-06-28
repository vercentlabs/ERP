import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PayrollPeriodsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PayrollPeriodsCreateInput = {
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

export type PayrollPeriodsUpdateInput = Partial<Omit<PayrollPeriodsCreateInput, "tenantId" | "code">>;

export type PayrollPeriodsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PayrollPeriodsRecord["priority"];
};

export type PayrollPeriodsActionContext = ActorContext & {
  reason?: string;
};

export type PayrollPeriodsStatus = DocumentStatus;

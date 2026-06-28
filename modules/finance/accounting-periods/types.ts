import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AccountingPeriodsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AccountingPeriodsCreateInput = {
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

export type AccountingPeriodsUpdateInput = Partial<Omit<AccountingPeriodsCreateInput, "tenantId" | "code">>;

export type AccountingPeriodsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AccountingPeriodsRecord["priority"];
};

export type AccountingPeriodsActionContext = ActorContext & {
  reason?: string;
};

export type AccountingPeriodsStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PeriodCloseRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PeriodCloseCreateInput = {
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

export type PeriodCloseUpdateInput = Partial<Omit<PeriodCloseCreateInput, "tenantId" | "code">>;

export type PeriodCloseListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PeriodCloseRecord["priority"];
};

export type PeriodCloseActionContext = ActorContext & {
  reason?: string;
};

export type PeriodCloseStatus = DocumentStatus;

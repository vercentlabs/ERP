import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type BillingSchedulesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type BillingSchedulesCreateInput = {
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

export type BillingSchedulesUpdateInput = Partial<Omit<BillingSchedulesCreateInput, "tenantId" | "code">>;

export type BillingSchedulesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: BillingSchedulesRecord["priority"];
};

export type BillingSchedulesActionContext = ActorContext & {
  reason?: string;
};

export type BillingSchedulesStatus = DocumentStatus;

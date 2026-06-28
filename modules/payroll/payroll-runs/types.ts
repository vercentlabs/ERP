import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PayrollRunsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PayrollRunsCreateInput = {
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

export type PayrollRunsUpdateInput = Partial<Omit<PayrollRunsCreateInput, "tenantId" | "code">>;

export type PayrollRunsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PayrollRunsRecord["priority"];
};

export type PayrollRunsActionContext = ActorContext & {
  reason?: string;
};

export type PayrollRunsStatus = DocumentStatus;

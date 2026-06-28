import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SalaryComponentsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SalaryComponentsCreateInput = {
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

export type SalaryComponentsUpdateInput = Partial<Omit<SalaryComponentsCreateInput, "tenantId" | "code">>;

export type SalaryComponentsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SalaryComponentsRecord["priority"];
};

export type SalaryComponentsActionContext = ActorContext & {
  reason?: string;
};

export type SalaryComponentsStatus = DocumentStatus;

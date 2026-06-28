import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type EmploymentContractsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type EmploymentContractsCreateInput = {
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

export type EmploymentContractsUpdateInput = Partial<Omit<EmploymentContractsCreateInput, "tenantId" | "code">>;

export type EmploymentContractsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: EmploymentContractsRecord["priority"];
};

export type EmploymentContractsActionContext = ActorContext & {
  reason?: string;
};

export type EmploymentContractsStatus = DocumentStatus;

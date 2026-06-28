import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type EmployeesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type EmployeesCreateInput = {
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

export type EmployeesUpdateInput = Partial<Omit<EmployeesCreateInput, "tenantId" | "code">>;

export type EmployeesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: EmployeesRecord["priority"];
};

export type EmployeesActionContext = ActorContext & {
  reason?: string;
};

export type EmployeesStatus = DocumentStatus;

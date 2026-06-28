import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DepartmentsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DepartmentsCreateInput = {
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

export type DepartmentsUpdateInput = Partial<Omit<DepartmentsCreateInput, "tenantId" | "code">>;

export type DepartmentsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DepartmentsRecord["priority"];
};

export type DepartmentsActionContext = ActorContext & {
  reason?: string;
};

export type DepartmentsStatus = DocumentStatus;

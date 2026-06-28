import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SalaryStructuresRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SalaryStructuresCreateInput = {
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

export type SalaryStructuresUpdateInput = Partial<Omit<SalaryStructuresCreateInput, "tenantId" | "code">>;

export type SalaryStructuresListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SalaryStructuresRecord["priority"];
};

export type SalaryStructuresActionContext = ActorContext & {
  reason?: string;
};

export type SalaryStructuresStatus = DocumentStatus;

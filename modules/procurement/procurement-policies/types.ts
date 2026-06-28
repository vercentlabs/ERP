import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProcurementPoliciesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProcurementPoliciesCreateInput = {
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

export type ProcurementPoliciesUpdateInput = Partial<Omit<ProcurementPoliciesCreateInput, "tenantId" | "code">>;

export type ProcurementPoliciesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProcurementPoliciesRecord["priority"];
};

export type ProcurementPoliciesActionContext = ActorContext & {
  reason?: string;
};

export type ProcurementPoliciesStatus = DocumentStatus;

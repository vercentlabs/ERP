import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type RiskAssessmentsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type RiskAssessmentsCreateInput = {
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

export type RiskAssessmentsUpdateInput = Partial<Omit<RiskAssessmentsCreateInput, "tenantId" | "code">>;

export type RiskAssessmentsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: RiskAssessmentsRecord["priority"];
};

export type RiskAssessmentsActionContext = ActorContext & {
  reason?: string;
};

export type RiskAssessmentsStatus = DocumentStatus;

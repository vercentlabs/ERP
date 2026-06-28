import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type VarianceAnalysisRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type VarianceAnalysisCreateInput = {
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

export type VarianceAnalysisUpdateInput = Partial<Omit<VarianceAnalysisCreateInput, "tenantId" | "code">>;

export type VarianceAnalysisListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: VarianceAnalysisRecord["priority"];
};

export type VarianceAnalysisActionContext = ActorContext & {
  reason?: string;
};

export type VarianceAnalysisStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ReportBuilderRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ReportBuilderCreateInput = {
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

export type ReportBuilderUpdateInput = Partial<Omit<ReportBuilderCreateInput, "tenantId" | "code">>;

export type ReportBuilderListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ReportBuilderRecord["priority"];
};

export type ReportBuilderActionContext = ActorContext & {
  reason?: string;
};

export type ReportBuilderStatus = DocumentStatus;

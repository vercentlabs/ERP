import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ManagementReportingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ManagementReportingCreateInput = {
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

export type ManagementReportingUpdateInput = Partial<Omit<ManagementReportingCreateInput, "tenantId" | "code">>;

export type ManagementReportingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ManagementReportingRecord["priority"];
};

export type ManagementReportingActionContext = ActorContext & {
  reason?: string;
};

export type ManagementReportingStatus = DocumentStatus;

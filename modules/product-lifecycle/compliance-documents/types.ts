import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ComplianceDocumentsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ComplianceDocumentsCreateInput = {
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

export type ComplianceDocumentsUpdateInput = Partial<Omit<ComplianceDocumentsCreateInput, "tenantId" | "code">>;

export type ComplianceDocumentsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ComplianceDocumentsRecord["priority"];
};

export type ComplianceDocumentsActionContext = ActorContext & {
  reason?: string;
};

export type ComplianceDocumentsStatus = DocumentStatus;

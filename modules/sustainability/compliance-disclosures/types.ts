import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ComplianceDisclosuresRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ComplianceDisclosuresCreateInput = {
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

export type ComplianceDisclosuresUpdateInput = Partial<Omit<ComplianceDisclosuresCreateInput, "tenantId" | "code">>;

export type ComplianceDisclosuresListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ComplianceDisclosuresRecord["priority"];
};

export type ComplianceDisclosuresActionContext = ActorContext & {
  reason?: string;
};

export type ComplianceDisclosuresStatus = DocumentStatus;

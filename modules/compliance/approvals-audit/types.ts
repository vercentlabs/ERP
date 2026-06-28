import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ApprovalsAuditRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ApprovalsAuditCreateInput = {
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

export type ApprovalsAuditUpdateInput = Partial<Omit<ApprovalsAuditCreateInput, "tenantId" | "code">>;

export type ApprovalsAuditListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ApprovalsAuditRecord["priority"];
};

export type ApprovalsAuditActionContext = ActorContext & {
  reason?: string;
};

export type ApprovalsAuditStatus = DocumentStatus;

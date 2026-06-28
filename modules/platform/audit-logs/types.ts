import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AuditLogsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AuditLogsCreateInput = {
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

export type AuditLogsUpdateInput = Partial<Omit<AuditLogsCreateInput, "tenantId" | "code">>;

export type AuditLogsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AuditLogsRecord["priority"];
};

export type AuditLogsActionContext = ActorContext & {
  reason?: string;
};

export type AuditLogsStatus = DocumentStatus;

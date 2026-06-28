import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CertificationsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CertificationsCreateInput = {
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

export type CertificationsUpdateInput = Partial<Omit<CertificationsCreateInput, "tenantId" | "code">>;

export type CertificationsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CertificationsRecord["priority"];
};

export type CertificationsActionContext = ActorContext & {
  reason?: string;
};

export type CertificationsStatus = DocumentStatus;

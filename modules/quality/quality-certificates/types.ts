import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type QualityCertificatesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type QualityCertificatesCreateInput = {
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

export type QualityCertificatesUpdateInput = Partial<Omit<QualityCertificatesCreateInput, "tenantId" | "code">>;

export type QualityCertificatesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: QualityCertificatesRecord["priority"];
};

export type QualityCertificatesActionContext = ActorContext & {
  reason?: string;
};

export type QualityCertificatesStatus = DocumentStatus;

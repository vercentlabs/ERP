import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SoftwareSaasRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SoftwareSaasCreateInput = {
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

export type SoftwareSaasUpdateInput = Partial<Omit<SoftwareSaasCreateInput, "tenantId" | "code">>;

export type SoftwareSaasListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SoftwareSaasRecord["priority"];
};

export type SoftwareSaasActionContext = ActorContext & {
  reason?: string;
};

export type SoftwareSaasStatus = DocumentStatus;

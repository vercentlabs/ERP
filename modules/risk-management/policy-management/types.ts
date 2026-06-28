import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PolicyManagementRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PolicyManagementCreateInput = {
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

export type PolicyManagementUpdateInput = Partial<Omit<PolicyManagementCreateInput, "tenantId" | "code">>;

export type PolicyManagementListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PolicyManagementRecord["priority"];
};

export type PolicyManagementActionContext = ActorContext & {
  reason?: string;
};

export type PolicyManagementStatus = DocumentStatus;

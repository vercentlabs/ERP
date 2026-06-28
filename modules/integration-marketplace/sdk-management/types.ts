import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SdkManagementRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SdkManagementCreateInput = {
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

export type SdkManagementUpdateInput = Partial<Omit<SdkManagementCreateInput, "tenantId" | "code">>;

export type SdkManagementListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SdkManagementRecord["priority"];
};

export type SdkManagementActionContext = ActorContext & {
  reason?: string;
};

export type SdkManagementStatus = DocumentStatus;

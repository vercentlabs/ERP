import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type EmissionsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type EmissionsCreateInput = {
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

export type EmissionsUpdateInput = Partial<Omit<EmissionsCreateInput, "tenantId" | "code">>;

export type EmissionsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: EmissionsRecord["priority"];
};

export type EmissionsActionContext = ActorContext & {
  reason?: string;
};

export type EmissionsStatus = DocumentStatus;

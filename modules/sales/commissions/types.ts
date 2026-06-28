import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CommissionsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CommissionsCreateInput = {
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

export type CommissionsUpdateInput = Partial<Omit<CommissionsCreateInput, "tenantId" | "code">>;

export type CommissionsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CommissionsRecord["priority"];
};

export type CommissionsActionContext = ActorContext & {
  reason?: string;
};

export type CommissionsStatus = DocumentStatus;

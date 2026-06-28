import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DeveloperPortalRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DeveloperPortalCreateInput = {
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

export type DeveloperPortalUpdateInput = Partial<Omit<DeveloperPortalCreateInput, "tenantId" | "code">>;

export type DeveloperPortalListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DeveloperPortalRecord["priority"];
};

export type DeveloperPortalActionContext = ActorContext & {
  reason?: string;
};

export type DeveloperPortalStatus = DocumentStatus;

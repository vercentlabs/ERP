import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CustomerPortalRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CustomerPortalCreateInput = {
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

export type CustomerPortalUpdateInput = Partial<Omit<CustomerPortalCreateInput, "tenantId" | "code">>;

export type CustomerPortalListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CustomerPortalRecord["priority"];
};

export type CustomerPortalActionContext = ActorContext & {
  reason?: string;
};

export type CustomerPortalStatus = DocumentStatus;

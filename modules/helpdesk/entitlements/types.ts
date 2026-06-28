import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type EntitlementsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type EntitlementsCreateInput = {
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

export type EntitlementsUpdateInput = Partial<Omit<EntitlementsCreateInput, "tenantId" | "code">>;

export type EntitlementsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: EntitlementsRecord["priority"];
};

export type EntitlementsActionContext = ActorContext & {
  reason?: string;
};

export type EntitlementsStatus = DocumentStatus;

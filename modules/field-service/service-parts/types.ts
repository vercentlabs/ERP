import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ServicePartsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ServicePartsCreateInput = {
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

export type ServicePartsUpdateInput = Partial<Omit<ServicePartsCreateInput, "tenantId" | "code">>;

export type ServicePartsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ServicePartsRecord["priority"];
};

export type ServicePartsActionContext = ActorContext & {
  reason?: string;
};

export type ServicePartsStatus = DocumentStatus;

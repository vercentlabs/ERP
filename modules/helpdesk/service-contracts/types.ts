import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ServiceContractsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ServiceContractsCreateInput = {
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

export type ServiceContractsUpdateInput = Partial<Omit<ServiceContractsCreateInput, "tenantId" | "code">>;

export type ServiceContractsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ServiceContractsRecord["priority"];
};

export type ServiceContractsActionContext = ActorContext & {
  reason?: string;
};

export type ServiceContractsStatus = DocumentStatus;

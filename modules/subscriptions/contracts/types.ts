import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ContractsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ContractsCreateInput = {
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

export type ContractsUpdateInput = Partial<Omit<ContractsCreateInput, "tenantId" | "code">>;

export type ContractsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ContractsRecord["priority"];
};

export type ContractsActionContext = ActorContext & {
  reason?: string;
};

export type ContractsStatus = DocumentStatus;

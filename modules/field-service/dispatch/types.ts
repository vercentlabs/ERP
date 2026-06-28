import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DispatchRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DispatchCreateInput = {
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

export type DispatchUpdateInput = Partial<Omit<DispatchCreateInput, "tenantId" | "code">>;

export type DispatchListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DispatchRecord["priority"];
};

export type DispatchActionContext = ActorContext & {
  reason?: string;
};

export type DispatchStatus = DocumentStatus;

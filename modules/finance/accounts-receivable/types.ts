import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AccountsReceivableRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AccountsReceivableCreateInput = {
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

export type AccountsReceivableUpdateInput = Partial<Omit<AccountsReceivableCreateInput, "tenantId" | "code">>;

export type AccountsReceivableListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AccountsReceivableRecord["priority"];
};

export type AccountsReceivableActionContext = ActorContext & {
  reason?: string;
};

export type AccountsReceivableStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AccountsPayableRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AccountsPayableCreateInput = {
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

export type AccountsPayableUpdateInput = Partial<Omit<AccountsPayableCreateInput, "tenantId" | "code">>;

export type AccountsPayableListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AccountsPayableRecord["priority"];
};

export type AccountsPayableActionContext = ActorContext & {
  reason?: string;
};

export type AccountsPayableStatus = DocumentStatus;

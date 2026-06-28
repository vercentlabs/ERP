import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AccountsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AccountsCreateInput = {
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

export type AccountsUpdateInput = Partial<Omit<AccountsCreateInput, "tenantId" | "code">>;

export type AccountsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AccountsRecord["priority"];
};

export type AccountsActionContext = ActorContext & {
  reason?: string;
};

export type AccountsStatus = DocumentStatus;

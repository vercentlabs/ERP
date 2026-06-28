import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ChartOfAccountsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ChartOfAccountsCreateInput = {
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

export type ChartOfAccountsUpdateInput = Partial<Omit<ChartOfAccountsCreateInput, "tenantId" | "code">>;

export type ChartOfAccountsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ChartOfAccountsRecord["priority"];
};

export type ChartOfAccountsActionContext = ActorContext & {
  reason?: string;
};

export type ChartOfAccountsStatus = DocumentStatus;

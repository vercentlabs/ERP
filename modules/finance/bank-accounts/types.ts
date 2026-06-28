import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type BankAccountsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type BankAccountsCreateInput = {
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

export type BankAccountsUpdateInput = Partial<Omit<BankAccountsCreateInput, "tenantId" | "code">>;

export type BankAccountsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: BankAccountsRecord["priority"];
};

export type BankAccountsActionContext = ActorContext & {
  reason?: string;
};

export type BankAccountsStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CurrenciesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CurrenciesCreateInput = {
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

export type CurrenciesUpdateInput = Partial<Omit<CurrenciesCreateInput, "tenantId" | "code">>;

export type CurrenciesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CurrenciesRecord["priority"];
};

export type CurrenciesActionContext = ActorContext & {
  reason?: string;
};

export type CurrenciesStatus = DocumentStatus;

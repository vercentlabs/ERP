import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ExchangeRatesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ExchangeRatesCreateInput = {
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

export type ExchangeRatesUpdateInput = Partial<Omit<ExchangeRatesCreateInput, "tenantId" | "code">>;

export type ExchangeRatesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ExchangeRatesRecord["priority"];
};

export type ExchangeRatesActionContext = ActorContext & {
  reason?: string;
};

export type ExchangeRatesStatus = DocumentStatus;

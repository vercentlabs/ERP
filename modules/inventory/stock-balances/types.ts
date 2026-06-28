import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type StockBalancesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type StockBalancesCreateInput = {
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

export type StockBalancesUpdateInput = Partial<Omit<StockBalancesCreateInput, "tenantId" | "code">>;

export type StockBalancesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: StockBalancesRecord["priority"];
};

export type StockBalancesActionContext = ActorContext & {
  reason?: string;
};

export type StockBalancesStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type StockAdjustmentsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type StockAdjustmentsCreateInput = {
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

export type StockAdjustmentsUpdateInput = Partial<Omit<StockAdjustmentsCreateInput, "tenantId" | "code">>;

export type StockAdjustmentsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: StockAdjustmentsRecord["priority"];
};

export type StockAdjustmentsActionContext = ActorContext & {
  reason?: string;
};

export type StockAdjustmentsStatus = DocumentStatus;

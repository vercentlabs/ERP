import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type StockTransfersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type StockTransfersCreateInput = {
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

export type StockTransfersUpdateInput = Partial<Omit<StockTransfersCreateInput, "tenantId" | "code">>;

export type StockTransfersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: StockTransfersRecord["priority"];
};

export type StockTransfersActionContext = ActorContext & {
  reason?: string;
};

export type StockTransfersStatus = DocumentStatus;

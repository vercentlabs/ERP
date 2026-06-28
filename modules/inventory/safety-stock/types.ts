import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SafetyStockRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SafetyStockCreateInput = {
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

export type SafetyStockUpdateInput = Partial<Omit<SafetyStockCreateInput, "tenantId" | "code">>;

export type SafetyStockListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SafetyStockRecord["priority"];
};

export type SafetyStockActionContext = ActorContext & {
  reason?: string;
};

export type SafetyStockStatus = DocumentStatus;

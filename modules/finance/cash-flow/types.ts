import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CashFlowRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CashFlowCreateInput = {
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

export type CashFlowUpdateInput = Partial<Omit<CashFlowCreateInput, "tenantId" | "code">>;

export type CashFlowListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CashFlowRecord["priority"];
};

export type CashFlowActionContext = ActorContext & {
  reason?: string;
};

export type CashFlowStatus = DocumentStatus;

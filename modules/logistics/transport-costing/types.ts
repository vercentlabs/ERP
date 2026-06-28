import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type TransportCostingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type TransportCostingCreateInput = {
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

export type TransportCostingUpdateInput = Partial<Omit<TransportCostingCreateInput, "tenantId" | "code">>;

export type TransportCostingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: TransportCostingRecord["priority"];
};

export type TransportCostingActionContext = ActorContext & {
  reason?: string;
};

export type TransportCostingStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PickingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PickingCreateInput = {
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

export type PickingUpdateInput = Partial<Omit<PickingCreateInput, "tenantId" | "code">>;

export type PickingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PickingRecord["priority"];
};

export type PickingActionContext = ActorContext & {
  reason?: string;
};

export type PickingStatus = DocumentStatus;

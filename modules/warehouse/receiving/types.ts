import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ReceivingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ReceivingCreateInput = {
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

export type ReceivingUpdateInput = Partial<Omit<ReceivingCreateInput, "tenantId" | "code">>;

export type ReceivingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ReceivingRecord["priority"];
};

export type ReceivingActionContext = ActorContext & {
  reason?: string;
};

export type ReceivingStatus = DocumentStatus;

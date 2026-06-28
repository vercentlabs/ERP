import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ShipmentTrackingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ShipmentTrackingCreateInput = {
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

export type ShipmentTrackingUpdateInput = Partial<Omit<ShipmentTrackingCreateInput, "tenantId" | "code">>;

export type ShipmentTrackingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ShipmentTrackingRecord["priority"];
};

export type ShipmentTrackingActionContext = ActorContext & {
  reason?: string;
};

export type ShipmentTrackingStatus = DocumentStatus;

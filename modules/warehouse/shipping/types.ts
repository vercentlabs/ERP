import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ShippingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ShippingCreateInput = {
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

export type ShippingUpdateInput = Partial<Omit<ShippingCreateInput, "tenantId" | "code">>;

export type ShippingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ShippingRecord["priority"];
};

export type ShippingActionContext = ActorContext & {
  reason?: string;
};

export type ShippingStatus = DocumentStatus;

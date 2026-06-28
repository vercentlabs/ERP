import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type EquipmentRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type EquipmentCreateInput = {
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

export type EquipmentUpdateInput = Partial<Omit<EquipmentCreateInput, "tenantId" | "code">>;

export type EquipmentListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: EquipmentRecord["priority"];
};

export type EquipmentActionContext = ActorContext & {
  reason?: string;
};

export type EquipmentStatus = DocumentStatus;

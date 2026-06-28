import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ShipmentsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ShipmentsCreateInput = {
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

export type ShipmentsUpdateInput = Partial<Omit<ShipmentsCreateInput, "tenantId" | "code">>;

export type ShipmentsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ShipmentsRecord["priority"];
};

export type ShipmentsActionContext = ActorContext & {
  reason?: string;
};

export type ShipmentsStatus = DocumentStatus;

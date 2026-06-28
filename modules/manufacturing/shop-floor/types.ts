import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ShopFloorRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ShopFloorCreateInput = {
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

export type ShopFloorUpdateInput = Partial<Omit<ShopFloorCreateInput, "tenantId" | "code">>;

export type ShopFloorListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ShopFloorRecord["priority"];
};

export type ShopFloorActionContext = ActorContext & {
  reason?: string;
};

export type ShopFloorStatus = DocumentStatus;

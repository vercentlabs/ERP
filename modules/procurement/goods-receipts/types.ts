import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type GoodsReceiptsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type GoodsReceiptsCreateInput = {
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

export type GoodsReceiptsUpdateInput = Partial<Omit<GoodsReceiptsCreateInput, "tenantId" | "code">>;

export type GoodsReceiptsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: GoodsReceiptsRecord["priority"];
};

export type GoodsReceiptsActionContext = ActorContext & {
  reason?: string;
};

export type GoodsReceiptsStatus = DocumentStatus;

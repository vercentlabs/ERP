import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ReceiptsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ReceiptsCreateInput = {
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

export type ReceiptsUpdateInput = Partial<Omit<ReceiptsCreateInput, "tenantId" | "code">>;

export type ReceiptsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ReceiptsRecord["priority"];
};

export type ReceiptsActionContext = ActorContext & {
  reason?: string;
};

export type ReceiptsStatus = DocumentStatus;

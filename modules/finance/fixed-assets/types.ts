import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type FixedAssetsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type FixedAssetsCreateInput = {
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

export type FixedAssetsUpdateInput = Partial<Omit<FixedAssetsCreateInput, "tenantId" | "code">>;

export type FixedAssetsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: FixedAssetsRecord["priority"];
};

export type FixedAssetsActionContext = ActorContext & {
  reason?: string;
};

export type FixedAssetsStatus = DocumentStatus;

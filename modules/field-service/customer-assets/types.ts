import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CustomerAssetsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CustomerAssetsCreateInput = {
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

export type CustomerAssetsUpdateInput = Partial<Omit<CustomerAssetsCreateInput, "tenantId" | "code">>;

export type CustomerAssetsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CustomerAssetsRecord["priority"];
};

export type CustomerAssetsActionContext = ActorContext & {
  reason?: string;
};

export type CustomerAssetsStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AssetsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AssetsCreateInput = {
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

export type AssetsUpdateInput = Partial<Omit<AssetsCreateInput, "tenantId" | "code">>;

export type AssetsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AssetsRecord["priority"];
};

export type AssetsActionContext = ActorContext & {
  reason?: string;
};

export type AssetsStatus = DocumentStatus;

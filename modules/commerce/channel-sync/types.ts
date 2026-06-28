import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ChannelSyncRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ChannelSyncCreateInput = {
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

export type ChannelSyncUpdateInput = Partial<Omit<ChannelSyncCreateInput, "tenantId" | "code">>;

export type ChannelSyncListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ChannelSyncRecord["priority"];
};

export type ChannelSyncActionContext = ActorContext & {
  reason?: string;
};

export type ChannelSyncStatus = DocumentStatus;

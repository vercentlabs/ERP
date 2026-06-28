import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type MeteredUsageRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type MeteredUsageCreateInput = {
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

export type MeteredUsageUpdateInput = Partial<Omit<MeteredUsageCreateInput, "tenantId" | "code">>;

export type MeteredUsageListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: MeteredUsageRecord["priority"];
};

export type MeteredUsageActionContext = ActorContext & {
  reason?: string;
};

export type MeteredUsageStatus = DocumentStatus;

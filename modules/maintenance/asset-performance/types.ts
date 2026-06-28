import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AssetPerformanceRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AssetPerformanceCreateInput = {
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

export type AssetPerformanceUpdateInput = Partial<Omit<AssetPerformanceCreateInput, "tenantId" | "code">>;

export type AssetPerformanceListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AssetPerformanceRecord["priority"];
};

export type AssetPerformanceActionContext = ActorContext & {
  reason?: string;
};

export type AssetPerformanceStatus = DocumentStatus;

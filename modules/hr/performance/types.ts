import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PerformanceRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PerformanceCreateInput = {
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

export type PerformanceUpdateInput = Partial<Omit<PerformanceCreateInput, "tenantId" | "code">>;

export type PerformanceListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PerformanceRecord["priority"];
};

export type PerformanceActionContext = ActorContext & {
  reason?: string;
};

export type PerformanceStatus = DocumentStatus;

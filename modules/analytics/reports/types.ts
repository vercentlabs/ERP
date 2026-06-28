import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ReportsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ReportsCreateInput = {
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

export type ReportsUpdateInput = Partial<Omit<ReportsCreateInput, "tenantId" | "code">>;

export type ReportsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ReportsRecord["priority"];
};

export type ReportsActionContext = ActorContext & {
  reason?: string;
};

export type ReportsStatus = DocumentStatus;

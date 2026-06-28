import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ScheduledReportsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ScheduledReportsCreateInput = {
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

export type ScheduledReportsUpdateInput = Partial<Omit<ScheduledReportsCreateInput, "tenantId" | "code">>;

export type ScheduledReportsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ScheduledReportsRecord["priority"];
};

export type ScheduledReportsActionContext = ActorContext & {
  reason?: string;
};

export type ScheduledReportsStatus = DocumentStatus;

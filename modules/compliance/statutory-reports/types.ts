import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type StatutoryReportsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type StatutoryReportsCreateInput = {
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

export type StatutoryReportsUpdateInput = Partial<Omit<StatutoryReportsCreateInput, "tenantId" | "code">>;

export type StatutoryReportsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: StatutoryReportsRecord["priority"];
};

export type StatutoryReportsActionContext = ActorContext & {
  reason?: string;
};

export type StatutoryReportsStatus = DocumentStatus;

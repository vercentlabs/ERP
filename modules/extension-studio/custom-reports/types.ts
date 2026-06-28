import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CustomReportsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CustomReportsCreateInput = {
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

export type CustomReportsUpdateInput = Partial<Omit<CustomReportsCreateInput, "tenantId" | "code">>;

export type CustomReportsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CustomReportsRecord["priority"];
};

export type CustomReportsActionContext = ActorContext & {
  reason?: string;
};

export type CustomReportsStatus = DocumentStatus;

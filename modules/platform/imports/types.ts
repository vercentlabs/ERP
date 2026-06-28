import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ImportsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ImportsCreateInput = {
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

export type ImportsUpdateInput = Partial<Omit<ImportsCreateInput, "tenantId" | "code">>;

export type ImportsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ImportsRecord["priority"];
};

export type ImportsActionContext = ActorContext & {
  reason?: string;
};

export type ImportsStatus = DocumentStatus;

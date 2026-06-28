import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ExportsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ExportsCreateInput = {
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

export type ExportsUpdateInput = Partial<Omit<ExportsCreateInput, "tenantId" | "code">>;

export type ExportsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ExportsRecord["priority"];
};

export type ExportsActionContext = ActorContext & {
  reason?: string;
};

export type ExportsStatus = DocumentStatus;

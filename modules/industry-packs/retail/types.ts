import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type RetailRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type RetailCreateInput = {
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

export type RetailUpdateInput = Partial<Omit<RetailCreateInput, "tenantId" | "code">>;

export type RetailListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: RetailRecord["priority"];
};

export type RetailActionContext = ActorContext & {
  reason?: string;
};

export type RetailStatus = DocumentStatus;

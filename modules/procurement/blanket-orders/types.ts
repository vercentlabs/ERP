import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type BlanketOrdersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type BlanketOrdersCreateInput = {
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

export type BlanketOrdersUpdateInput = Partial<Omit<BlanketOrdersCreateInput, "tenantId" | "code">>;

export type BlanketOrdersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: BlanketOrdersRecord["priority"];
};

export type BlanketOrdersActionContext = ActorContext & {
  reason?: string;
};

export type BlanketOrdersStatus = DocumentStatus;

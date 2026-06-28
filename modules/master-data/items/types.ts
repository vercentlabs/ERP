import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ItemsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ItemsCreateInput = {
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

export type ItemsUpdateInput = Partial<Omit<ItemsCreateInput, "tenantId" | "code">>;

export type ItemsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ItemsRecord["priority"];
};

export type ItemsActionContext = ActorContext & {
  reason?: string;
};

export type ItemsStatus = DocumentStatus;

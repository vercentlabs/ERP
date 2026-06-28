import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CustomObjectsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CustomObjectsCreateInput = {
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

export type CustomObjectsUpdateInput = Partial<Omit<CustomObjectsCreateInput, "tenantId" | "code">>;

export type CustomObjectsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CustomObjectsRecord["priority"];
};

export type CustomObjectsActionContext = ActorContext & {
  reason?: string;
};

export type CustomObjectsStatus = DocumentStatus;

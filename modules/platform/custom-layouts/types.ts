import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CustomLayoutsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CustomLayoutsCreateInput = {
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

export type CustomLayoutsUpdateInput = Partial<Omit<CustomLayoutsCreateInput, "tenantId" | "code">>;

export type CustomLayoutsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CustomLayoutsRecord["priority"];
};

export type CustomLayoutsActionContext = ActorContext & {
  reason?: string;
};

export type CustomLayoutsStatus = DocumentStatus;

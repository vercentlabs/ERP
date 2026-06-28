import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CustomFieldsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CustomFieldsCreateInput = {
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

export type CustomFieldsUpdateInput = Partial<Omit<CustomFieldsCreateInput, "tenantId" | "code">>;

export type CustomFieldsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CustomFieldsRecord["priority"];
};

export type CustomFieldsActionContext = ActorContext & {
  reason?: string;
};

export type CustomFieldsStatus = DocumentStatus;

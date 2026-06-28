import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CustomerGroupsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CustomerGroupsCreateInput = {
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

export type CustomerGroupsUpdateInput = Partial<Omit<CustomerGroupsCreateInput, "tenantId" | "code">>;

export type CustomerGroupsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CustomerGroupsRecord["priority"];
};

export type CustomerGroupsActionContext = ActorContext & {
  reason?: string;
};

export type CustomerGroupsStatus = DocumentStatus;

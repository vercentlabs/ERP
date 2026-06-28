import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CustomersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CustomersCreateInput = {
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

export type CustomersUpdateInput = Partial<Omit<CustomersCreateInput, "tenantId" | "code">>;

export type CustomersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CustomersRecord["priority"];
};

export type CustomersActionContext = ActorContext & {
  reason?: string;
};

export type CustomersStatus = DocumentStatus;

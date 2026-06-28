import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CommerceOrdersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CommerceOrdersCreateInput = {
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

export type CommerceOrdersUpdateInput = Partial<Omit<CommerceOrdersCreateInput, "tenantId" | "code">>;

export type CommerceOrdersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CommerceOrdersRecord["priority"];
};

export type CommerceOrdersActionContext = ActorContext & {
  reason?: string;
};

export type CommerceOrdersStatus = DocumentStatus;

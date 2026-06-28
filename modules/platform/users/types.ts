import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type UsersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type UsersCreateInput = {
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

export type UsersUpdateInput = Partial<Omit<UsersCreateInput, "tenantId" | "code">>;

export type UsersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: UsersRecord["priority"];
};

export type UsersActionContext = ActorContext & {
  reason?: string;
};

export type UsersStatus = DocumentStatus;

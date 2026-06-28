import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AuthRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AuthCreateInput = {
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

export type AuthUpdateInput = Partial<Omit<AuthCreateInput, "tenantId" | "code">>;

export type AuthListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AuthRecord["priority"];
};

export type AuthActionContext = ActorContext & {
  reason?: string;
};

export type AuthStatus = DocumentStatus;

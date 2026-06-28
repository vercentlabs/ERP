import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ApiKeysRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ApiKeysCreateInput = {
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

export type ApiKeysUpdateInput = Partial<Omit<ApiKeysCreateInput, "tenantId" | "code">>;

export type ApiKeysListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ApiKeysRecord["priority"];
};

export type ApiKeysActionContext = ActorContext & {
  reason?: string;
};

export type ApiKeysStatus = DocumentStatus;

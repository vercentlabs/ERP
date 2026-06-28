import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PublicApiRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PublicApiCreateInput = {
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

export type PublicApiUpdateInput = Partial<Omit<PublicApiCreateInput, "tenantId" | "code">>;

export type PublicApiListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PublicApiRecord["priority"];
};

export type PublicApiActionContext = ActorContext & {
  reason?: string;
};

export type PublicApiStatus = DocumentStatus;

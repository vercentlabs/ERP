import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SearchRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SearchCreateInput = {
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

export type SearchUpdateInput = Partial<Omit<SearchCreateInput, "tenantId" | "code">>;

export type SearchListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SearchRecord["priority"];
};

export type SearchActionContext = ActorContext & {
  reason?: string;
};

export type SearchStatus = DocumentStatus;

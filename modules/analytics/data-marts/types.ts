import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DataMartsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DataMartsCreateInput = {
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

export type DataMartsUpdateInput = Partial<Omit<DataMartsCreateInput, "tenantId" | "code">>;

export type DataMartsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DataMartsRecord["priority"];
};

export type DataMartsActionContext = ActorContext & {
  reason?: string;
};

export type DataMartsStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DataRetentionRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DataRetentionCreateInput = {
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

export type DataRetentionUpdateInput = Partial<Omit<DataRetentionCreateInput, "tenantId" | "code">>;

export type DataRetentionListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DataRetentionRecord["priority"];
};

export type DataRetentionActionContext = ActorContext & {
  reason?: string;
};

export type DataRetentionStatus = DocumentStatus;

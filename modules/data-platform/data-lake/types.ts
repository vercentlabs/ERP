import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DataLakeRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DataLakeCreateInput = {
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

export type DataLakeUpdateInput = Partial<Omit<DataLakeCreateInput, "tenantId" | "code">>;

export type DataLakeListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DataLakeRecord["priority"];
};

export type DataLakeActionContext = ActorContext & {
  reason?: string;
};

export type DataLakeStatus = DocumentStatus;

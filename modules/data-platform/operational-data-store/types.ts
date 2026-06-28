import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type OperationalDataStoreRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type OperationalDataStoreCreateInput = {
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

export type OperationalDataStoreUpdateInput = Partial<Omit<OperationalDataStoreCreateInput, "tenantId" | "code">>;

export type OperationalDataStoreListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: OperationalDataStoreRecord["priority"];
};

export type OperationalDataStoreActionContext = ActorContext & {
  reason?: string;
};

export type OperationalDataStoreStatus = DocumentStatus;

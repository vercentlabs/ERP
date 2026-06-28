import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SerialBatchesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SerialBatchesCreateInput = {
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

export type SerialBatchesUpdateInput = Partial<Omit<SerialBatchesCreateInput, "tenantId" | "code">>;

export type SerialBatchesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SerialBatchesRecord["priority"];
};

export type SerialBatchesActionContext = ActorContext & {
  reason?: string;
};

export type SerialBatchesStatus = DocumentStatus;

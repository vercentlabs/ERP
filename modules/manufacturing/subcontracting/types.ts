import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SubcontractingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SubcontractingCreateInput = {
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

export type SubcontractingUpdateInput = Partial<Omit<SubcontractingCreateInput, "tenantId" | "code">>;

export type SubcontractingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SubcontractingRecord["priority"];
};

export type SubcontractingActionContext = ActorContext & {
  reason?: string;
};

export type SubcontractingStatus = DocumentStatus;

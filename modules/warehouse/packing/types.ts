import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PackingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PackingCreateInput = {
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

export type PackingUpdateInput = Partial<Omit<PackingCreateInput, "tenantId" | "code">>;

export type PackingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PackingRecord["priority"];
};

export type PackingActionContext = ActorContext & {
  reason?: string;
};

export type PackingStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CycleCountsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CycleCountsCreateInput = {
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

export type CycleCountsUpdateInput = Partial<Omit<CycleCountsCreateInput, "tenantId" | "code">>;

export type CycleCountsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CycleCountsRecord["priority"];
};

export type CycleCountsActionContext = ActorContext & {
  reason?: string;
};

export type CycleCountsStatus = DocumentStatus;

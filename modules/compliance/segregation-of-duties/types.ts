import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SegregationOfDutiesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SegregationOfDutiesCreateInput = {
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

export type SegregationOfDutiesUpdateInput = Partial<Omit<SegregationOfDutiesCreateInput, "tenantId" | "code">>;

export type SegregationOfDutiesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SegregationOfDutiesRecord["priority"];
};

export type SegregationOfDutiesActionContext = ActorContext & {
  reason?: string;
};

export type SegregationOfDutiesStatus = DocumentStatus;

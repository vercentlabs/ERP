import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SegmentsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SegmentsCreateInput = {
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

export type SegmentsUpdateInput = Partial<Omit<SegmentsCreateInput, "tenantId" | "code">>;

export type SegmentsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SegmentsRecord["priority"];
};

export type SegmentsActionContext = ActorContext & {
  reason?: string;
};

export type SegmentsStatus = DocumentStatus;

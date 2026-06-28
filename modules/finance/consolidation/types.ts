import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ConsolidationRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ConsolidationCreateInput = {
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

export type ConsolidationUpdateInput = Partial<Omit<ConsolidationCreateInput, "tenantId" | "code">>;

export type ConsolidationListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ConsolidationRecord["priority"];
};

export type ConsolidationActionContext = ActorContext & {
  reason?: string;
};

export type ConsolidationStatus = DocumentStatus;

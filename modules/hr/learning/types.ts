import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type LearningRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type LearningCreateInput = {
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

export type LearningUpdateInput = Partial<Omit<LearningCreateInput, "tenantId" | "code">>;

export type LearningListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: LearningRecord["priority"];
};

export type LearningActionContext = ActorContext & {
  reason?: string;
};

export type LearningStatus = DocumentStatus;

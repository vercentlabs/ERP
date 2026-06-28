import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ScenarioModelingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ScenarioModelingCreateInput = {
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

export type ScenarioModelingUpdateInput = Partial<Omit<ScenarioModelingCreateInput, "tenantId" | "code">>;

export type ScenarioModelingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ScenarioModelingRecord["priority"];
};

export type ScenarioModelingActionContext = ActorContext & {
  reason?: string;
};

export type ScenarioModelingStatus = DocumentStatus;

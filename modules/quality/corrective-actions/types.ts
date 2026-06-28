import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CorrectiveActionsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CorrectiveActionsCreateInput = {
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

export type CorrectiveActionsUpdateInput = Partial<Omit<CorrectiveActionsCreateInput, "tenantId" | "code">>;

export type CorrectiveActionsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CorrectiveActionsRecord["priority"];
};

export type CorrectiveActionsActionContext = ActorContext & {
  reason?: string;
};

export type CorrectiveActionsStatus = DocumentStatus;

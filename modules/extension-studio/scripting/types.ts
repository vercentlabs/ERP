import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ScriptingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ScriptingCreateInput = {
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

export type ScriptingUpdateInput = Partial<Omit<ScriptingCreateInput, "tenantId" | "code">>;

export type ScriptingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ScriptingRecord["priority"];
};

export type ScriptingActionContext = ActorContext & {
  reason?: string;
};

export type ScriptingStatus = DocumentStatus;

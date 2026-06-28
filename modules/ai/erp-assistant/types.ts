import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ErpAssistantRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ErpAssistantCreateInput = {
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

export type ErpAssistantUpdateInput = Partial<Omit<ErpAssistantCreateInput, "tenantId" | "code">>;

export type ErpAssistantListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ErpAssistantRecord["priority"];
};

export type ErpAssistantActionContext = ActorContext & {
  reason?: string;
};

export type ErpAssistantStatus = DocumentStatus;

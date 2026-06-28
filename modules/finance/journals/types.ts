import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type JournalsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type JournalsCreateInput = {
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

export type JournalsUpdateInput = Partial<Omit<JournalsCreateInput, "tenantId" | "code">>;

export type JournalsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: JournalsRecord["priority"];
};

export type JournalsActionContext = ActorContext & {
  reason?: string;
};

export type JournalsStatus = DocumentStatus;

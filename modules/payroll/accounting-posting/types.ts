import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AccountingPostingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AccountingPostingCreateInput = {
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

export type AccountingPostingUpdateInput = Partial<Omit<AccountingPostingCreateInput, "tenantId" | "code">>;

export type AccountingPostingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AccountingPostingRecord["priority"];
};

export type AccountingPostingActionContext = ActorContext & {
  reason?: string;
};

export type AccountingPostingStatus = DocumentStatus;

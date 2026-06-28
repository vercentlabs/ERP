import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type GeneralLedgerRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type GeneralLedgerCreateInput = {
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

export type GeneralLedgerUpdateInput = Partial<Omit<GeneralLedgerCreateInput, "tenantId" | "code">>;

export type GeneralLedgerListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: GeneralLedgerRecord["priority"];
};

export type GeneralLedgerActionContext = ActorContext & {
  reason?: string;
};

export type GeneralLedgerStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type TimesheetsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type TimesheetsCreateInput = {
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

export type TimesheetsUpdateInput = Partial<Omit<TimesheetsCreateInput, "tenantId" | "code">>;

export type TimesheetsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: TimesheetsRecord["priority"];
};

export type TimesheetsActionContext = ActorContext & {
  reason?: string;
};

export type TimesheetsStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type LocalizationsIndiaPfRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type LocalizationsIndiaPfCreateInput = {
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

export type LocalizationsIndiaPfUpdateInput = Partial<Omit<LocalizationsIndiaPfCreateInput, "tenantId" | "code">>;

export type LocalizationsIndiaPfListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: LocalizationsIndiaPfRecord["priority"];
};

export type LocalizationsIndiaPfActionContext = ActorContext & {
  reason?: string;
};

export type LocalizationsIndiaPfStatus = DocumentStatus;

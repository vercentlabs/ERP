import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CurrencyMasterRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CurrencyMasterCreateInput = {
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

export type CurrencyMasterUpdateInput = Partial<Omit<CurrencyMasterCreateInput, "tenantId" | "code">>;

export type CurrencyMasterListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CurrencyMasterRecord["priority"];
};

export type CurrencyMasterActionContext = ActorContext & {
  reason?: string;
};

export type CurrencyMasterStatus = DocumentStatus;

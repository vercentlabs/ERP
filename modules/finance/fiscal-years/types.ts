import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type FiscalYearsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type FiscalYearsCreateInput = {
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

export type FiscalYearsUpdateInput = Partial<Omit<FiscalYearsCreateInput, "tenantId" | "code">>;

export type FiscalYearsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: FiscalYearsRecord["priority"];
};

export type FiscalYearsActionContext = ActorContext & {
  reason?: string;
};

export type FiscalYearsStatus = DocumentStatus;

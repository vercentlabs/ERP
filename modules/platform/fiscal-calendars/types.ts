import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type FiscalCalendarsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type FiscalCalendarsCreateInput = {
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

export type FiscalCalendarsUpdateInput = Partial<Omit<FiscalCalendarsCreateInput, "tenantId" | "code">>;

export type FiscalCalendarsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: FiscalCalendarsRecord["priority"];
};

export type FiscalCalendarsActionContext = ActorContext & {
  reason?: string;
};

export type FiscalCalendarsStatus = DocumentStatus;

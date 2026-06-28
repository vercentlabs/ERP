import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type FormulaFieldsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type FormulaFieldsCreateInput = {
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

export type FormulaFieldsUpdateInput = Partial<Omit<FormulaFieldsCreateInput, "tenantId" | "code">>;

export type FormulaFieldsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: FormulaFieldsRecord["priority"];
};

export type FormulaFieldsActionContext = ActorContext & {
  reason?: string;
};

export type FormulaFieldsStatus = DocumentStatus;

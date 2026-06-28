import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type TaxesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type TaxesCreateInput = {
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

export type TaxesUpdateInput = Partial<Omit<TaxesCreateInput, "tenantId" | "code">>;

export type TaxesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: TaxesRecord["priority"];
};

export type TaxesActionContext = ActorContext & {
  reason?: string;
};

export type TaxesStatus = DocumentStatus;

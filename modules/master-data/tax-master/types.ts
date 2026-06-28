import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type TaxMasterRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type TaxMasterCreateInput = {
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

export type TaxMasterUpdateInput = Partial<Omit<TaxMasterCreateInput, "tenantId" | "code">>;

export type TaxMasterListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: TaxMasterRecord["priority"];
};

export type TaxMasterActionContext = ActorContext & {
  reason?: string;
};

export type TaxMasterStatus = DocumentStatus;

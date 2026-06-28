import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type TaxComplianceRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type TaxComplianceCreateInput = {
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

export type TaxComplianceUpdateInput = Partial<Omit<TaxComplianceCreateInput, "tenantId" | "code">>;

export type TaxComplianceListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: TaxComplianceRecord["priority"];
};

export type TaxComplianceActionContext = ActorContext & {
  reason?: string;
};

export type TaxComplianceStatus = DocumentStatus;

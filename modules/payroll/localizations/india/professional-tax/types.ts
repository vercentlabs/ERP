import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type LocalizationsIndiaProfessionalTaxRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type LocalizationsIndiaProfessionalTaxCreateInput = {
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

export type LocalizationsIndiaProfessionalTaxUpdateInput = Partial<Omit<LocalizationsIndiaProfessionalTaxCreateInput, "tenantId" | "code">>;

export type LocalizationsIndiaProfessionalTaxListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: LocalizationsIndiaProfessionalTaxRecord["priority"];
};

export type LocalizationsIndiaProfessionalTaxActionContext = ActorContext & {
  reason?: string;
};

export type LocalizationsIndiaProfessionalTaxStatus = DocumentStatus;

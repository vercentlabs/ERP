import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProfessionalServicesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProfessionalServicesCreateInput = {
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

export type ProfessionalServicesUpdateInput = Partial<Omit<ProfessionalServicesCreateInput, "tenantId" | "code">>;

export type ProfessionalServicesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProfessionalServicesRecord["priority"];
};

export type ProfessionalServicesActionContext = ActorContext & {
  reason?: string;
};

export type ProfessionalServicesStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CompaniesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CompaniesCreateInput = {
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

export type CompaniesUpdateInput = Partial<Omit<CompaniesCreateInput, "tenantId" | "code">>;

export type CompaniesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CompaniesRecord["priority"];
};

export type CompaniesActionContext = ActorContext & {
  reason?: string;
};

export type CompaniesStatus = DocumentStatus;

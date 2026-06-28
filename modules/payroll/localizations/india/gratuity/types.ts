import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type LocalizationsIndiaGratuityRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type LocalizationsIndiaGratuityCreateInput = {
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

export type LocalizationsIndiaGratuityUpdateInput = Partial<Omit<LocalizationsIndiaGratuityCreateInput, "tenantId" | "code">>;

export type LocalizationsIndiaGratuityListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: LocalizationsIndiaGratuityRecord["priority"];
};

export type LocalizationsIndiaGratuityActionContext = ActorContext & {
  reason?: string;
};

export type LocalizationsIndiaGratuityStatus = DocumentStatus;

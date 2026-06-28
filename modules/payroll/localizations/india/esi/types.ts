import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type LocalizationsIndiaEsiRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type LocalizationsIndiaEsiCreateInput = {
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

export type LocalizationsIndiaEsiUpdateInput = Partial<Omit<LocalizationsIndiaEsiCreateInput, "tenantId" | "code">>;

export type LocalizationsIndiaEsiListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: LocalizationsIndiaEsiRecord["priority"];
};

export type LocalizationsIndiaEsiActionContext = ActorContext & {
  reason?: string;
};

export type LocalizationsIndiaEsiStatus = DocumentStatus;

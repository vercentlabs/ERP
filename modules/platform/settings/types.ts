import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SettingsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SettingsCreateInput = {
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

export type SettingsUpdateInput = Partial<Omit<SettingsCreateInput, "tenantId" | "code">>;

export type SettingsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SettingsRecord["priority"];
};

export type SettingsActionContext = ActorContext & {
  reason?: string;
};

export type SettingsStatus = DocumentStatus;

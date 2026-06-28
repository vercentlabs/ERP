import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type LocalizationsIndiaTdsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type LocalizationsIndiaTdsCreateInput = {
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

export type LocalizationsIndiaTdsUpdateInput = Partial<Omit<LocalizationsIndiaTdsCreateInput, "tenantId" | "code">>;

export type LocalizationsIndiaTdsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: LocalizationsIndiaTdsRecord["priority"];
};

export type LocalizationsIndiaTdsActionContext = ActorContext & {
  reason?: string;
};

export type LocalizationsIndiaTdsStatus = DocumentStatus;

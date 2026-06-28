import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type LocalizationsIndiaForm16Record = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type LocalizationsIndiaForm16CreateInput = {
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

export type LocalizationsIndiaForm16UpdateInput = Partial<Omit<LocalizationsIndiaForm16CreateInput, "tenantId" | "code">>;

export type LocalizationsIndiaForm16ListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: LocalizationsIndiaForm16Record["priority"];
};

export type LocalizationsIndiaForm16ActionContext = ActorContext & {
  reason?: string;
};

export type LocalizationsIndiaForm16Status = DocumentStatus;

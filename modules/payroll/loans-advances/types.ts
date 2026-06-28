import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type LoansAdvancesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type LoansAdvancesCreateInput = {
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

export type LoansAdvancesUpdateInput = Partial<Omit<LoansAdvancesCreateInput, "tenantId" | "code">>;

export type LoansAdvancesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: LoansAdvancesRecord["priority"];
};

export type LoansAdvancesActionContext = ActorContext & {
  reason?: string;
};

export type LoansAdvancesStatus = DocumentStatus;

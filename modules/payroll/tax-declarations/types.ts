import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type TaxDeclarationsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type TaxDeclarationsCreateInput = {
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

export type TaxDeclarationsUpdateInput = Partial<Omit<TaxDeclarationsCreateInput, "tenantId" | "code">>;

export type TaxDeclarationsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: TaxDeclarationsRecord["priority"];
};

export type TaxDeclarationsActionContext = ActorContext & {
  reason?: string;
};

export type TaxDeclarationsStatus = DocumentStatus;

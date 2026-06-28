import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type VariantsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type VariantsCreateInput = {
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

export type VariantsUpdateInput = Partial<Omit<VariantsCreateInput, "tenantId" | "code">>;

export type VariantsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: VariantsRecord["priority"];
};

export type VariantsActionContext = ActorContext & {
  reason?: string;
};

export type VariantsStatus = DocumentStatus;

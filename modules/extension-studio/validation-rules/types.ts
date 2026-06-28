import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ValidationRulesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ValidationRulesCreateInput = {
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

export type ValidationRulesUpdateInput = Partial<Omit<ValidationRulesCreateInput, "tenantId" | "code">>;

export type ValidationRulesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ValidationRulesRecord["priority"];
};

export type ValidationRulesActionContext = ActorContext & {
  reason?: string;
};

export type ValidationRulesStatus = DocumentStatus;

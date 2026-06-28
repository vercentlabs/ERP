import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProfitabilityRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProfitabilityCreateInput = {
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

export type ProfitabilityUpdateInput = Partial<Omit<ProfitabilityCreateInput, "tenantId" | "code">>;

export type ProfitabilityListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProfitabilityRecord["priority"];
};

export type ProfitabilityActionContext = ActorContext & {
  reason?: string;
};

export type ProfitabilityStatus = DocumentStatus;

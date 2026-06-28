import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PlansRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PlansCreateInput = {
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

export type PlansUpdateInput = Partial<Omit<PlansCreateInput, "tenantId" | "code">>;

export type PlansListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PlansRecord["priority"];
};

export type PlansActionContext = ActorContext & {
  reason?: string;
};

export type PlansStatus = DocumentStatus;

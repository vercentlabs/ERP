import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type TechniciansRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type TechniciansCreateInput = {
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

export type TechniciansUpdateInput = Partial<Omit<TechniciansCreateInput, "tenantId" | "code">>;

export type TechniciansListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: TechniciansRecord["priority"];
};

export type TechniciansActionContext = ActorContext & {
  reason?: string;
};

export type TechniciansStatus = DocumentStatus;

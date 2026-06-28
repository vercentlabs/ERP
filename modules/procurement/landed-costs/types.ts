import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type LandedCostsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type LandedCostsCreateInput = {
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

export type LandedCostsUpdateInput = Partial<Omit<LandedCostsCreateInput, "tenantId" | "code">>;

export type LandedCostsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: LandedCostsRecord["priority"];
};

export type LandedCostsActionContext = ActorContext & {
  reason?: string;
};

export type LandedCostsStatus = DocumentStatus;

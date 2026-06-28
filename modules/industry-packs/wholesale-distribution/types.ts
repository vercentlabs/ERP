import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type WholesaleDistributionRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type WholesaleDistributionCreateInput = {
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

export type WholesaleDistributionUpdateInput = Partial<Omit<WholesaleDistributionCreateInput, "tenantId" | "code">>;

export type WholesaleDistributionListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: WholesaleDistributionRecord["priority"];
};

export type WholesaleDistributionActionContext = ActorContext & {
  reason?: string;
};

export type WholesaleDistributionStatus = DocumentStatus;

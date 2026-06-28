import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type BenefitsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type BenefitsCreateInput = {
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

export type BenefitsUpdateInput = Partial<Omit<BenefitsCreateInput, "tenantId" | "code">>;

export type BenefitsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: BenefitsRecord["priority"];
};

export type BenefitsActionContext = ActorContext & {
  reason?: string;
};

export type BenefitsStatus = DocumentStatus;

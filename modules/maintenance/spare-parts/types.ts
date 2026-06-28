import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SparePartsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SparePartsCreateInput = {
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

export type SparePartsUpdateInput = Partial<Omit<SparePartsCreateInput, "tenantId" | "code">>;

export type SparePartsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SparePartsRecord["priority"];
};

export type SparePartsActionContext = ActorContext & {
  reason?: string;
};

export type SparePartsStatus = DocumentStatus;

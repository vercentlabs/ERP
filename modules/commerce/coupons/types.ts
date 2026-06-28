import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CouponsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CouponsCreateInput = {
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

export type CouponsUpdateInput = Partial<Omit<CouponsCreateInput, "tenantId" | "code">>;

export type CouponsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CouponsRecord["priority"];
};

export type CouponsActionContext = ActorContext & {
  reason?: string;
};

export type CouponsStatus = DocumentStatus;

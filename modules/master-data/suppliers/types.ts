import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SuppliersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SuppliersCreateInput = {
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

export type SuppliersUpdateInput = Partial<Omit<SuppliersCreateInput, "tenantId" | "code">>;

export type SuppliersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SuppliersRecord["priority"];
};

export type SuppliersActionContext = ActorContext & {
  reason?: string;
};

export type SuppliersStatus = DocumentStatus;

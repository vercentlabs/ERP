import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SupplierQuotationsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SupplierQuotationsCreateInput = {
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

export type SupplierQuotationsUpdateInput = Partial<Omit<SupplierQuotationsCreateInput, "tenantId" | "code">>;

export type SupplierQuotationsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SupplierQuotationsRecord["priority"];
};

export type SupplierQuotationsActionContext = ActorContext & {
  reason?: string;
};

export type SupplierQuotationsStatus = DocumentStatus;

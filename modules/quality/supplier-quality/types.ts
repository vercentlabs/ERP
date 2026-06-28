import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SupplierQualityRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SupplierQualityCreateInput = {
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

export type SupplierQualityUpdateInput = Partial<Omit<SupplierQualityCreateInput, "tenantId" | "code">>;

export type SupplierQualityListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SupplierQualityRecord["priority"];
};

export type SupplierQualityActionContext = ActorContext & {
  reason?: string;
};

export type SupplierQualityStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SupplierSustainabilityRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SupplierSustainabilityCreateInput = {
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

export type SupplierSustainabilityUpdateInput = Partial<Omit<SupplierSustainabilityCreateInput, "tenantId" | "code">>;

export type SupplierSustainabilityListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SupplierSustainabilityRecord["priority"];
};

export type SupplierSustainabilityActionContext = ActorContext & {
  reason?: string;
};

export type SupplierSustainabilityStatus = DocumentStatus;

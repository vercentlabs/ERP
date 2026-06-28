import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type BillOfMaterialsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type BillOfMaterialsCreateInput = {
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

export type BillOfMaterialsUpdateInput = Partial<Omit<BillOfMaterialsCreateInput, "tenantId" | "code">>;

export type BillOfMaterialsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: BillOfMaterialsRecord["priority"];
};

export type BillOfMaterialsActionContext = ActorContext & {
  reason?: string;
};

export type BillOfMaterialsStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProductsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProductsCreateInput = {
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

export type ProductsUpdateInput = Partial<Omit<ProductsCreateInput, "tenantId" | "code">>;

export type ProductsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProductsRecord["priority"];
};

export type ProductsActionContext = ActorContext & {
  reason?: string;
};

export type ProductsStatus = DocumentStatus;

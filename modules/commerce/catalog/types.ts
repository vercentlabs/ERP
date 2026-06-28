import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CatalogRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CatalogCreateInput = {
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

export type CatalogUpdateInput = Partial<Omit<CatalogCreateInput, "tenantId" | "code">>;

export type CatalogListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CatalogRecord["priority"];
};

export type CatalogActionContext = ActorContext & {
  reason?: string;
};

export type CatalogStatus = DocumentStatus;

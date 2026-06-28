import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProductRevisionsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProductRevisionsCreateInput = {
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

export type ProductRevisionsUpdateInput = Partial<Omit<ProductRevisionsCreateInput, "tenantId" | "code">>;

export type ProductRevisionsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProductRevisionsRecord["priority"];
};

export type ProductRevisionsActionContext = ActorContext & {
  reason?: string;
};

export type ProductRevisionsStatus = DocumentStatus;

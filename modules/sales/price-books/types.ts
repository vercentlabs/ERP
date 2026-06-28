import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PriceBooksRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PriceBooksCreateInput = {
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

export type PriceBooksUpdateInput = Partial<Omit<PriceBooksCreateInput, "tenantId" | "code">>;

export type PriceBooksListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PriceBooksRecord["priority"];
};

export type PriceBooksActionContext = ActorContext & {
  reason?: string;
};

export type PriceBooksStatus = DocumentStatus;

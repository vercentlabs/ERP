import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type StorefrontRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type StorefrontCreateInput = {
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

export type StorefrontUpdateInput = Partial<Omit<StorefrontCreateInput, "tenantId" | "code">>;

export type StorefrontListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: StorefrontRecord["priority"];
};

export type StorefrontActionContext = ActorContext & {
  reason?: string;
};

export type StorefrontStatus = DocumentStatus;

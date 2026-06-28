import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CustomPagesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CustomPagesCreateInput = {
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

export type CustomPagesUpdateInput = Partial<Omit<CustomPagesCreateInput, "tenantId" | "code">>;

export type CustomPagesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CustomPagesRecord["priority"];
};

export type CustomPagesActionContext = ActorContext & {
  reason?: string;
};

export type CustomPagesStatus = DocumentStatus;

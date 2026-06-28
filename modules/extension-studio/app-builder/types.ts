import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AppBuilderRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AppBuilderCreateInput = {
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

export type AppBuilderUpdateInput = Partial<Omit<AppBuilderCreateInput, "tenantId" | "code">>;

export type AppBuilderListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AppBuilderRecord["priority"];
};

export type AppBuilderActionContext = ActorContext & {
  reason?: string;
};

export type AppBuilderStatus = DocumentStatus;

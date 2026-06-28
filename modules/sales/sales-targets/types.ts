import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SalesTargetsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SalesTargetsCreateInput = {
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

export type SalesTargetsUpdateInput = Partial<Omit<SalesTargetsCreateInput, "tenantId" | "code">>;

export type SalesTargetsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SalesTargetsRecord["priority"];
};

export type SalesTargetsActionContext = ActorContext & {
  reason?: string;
};

export type SalesTargetsStatus = DocumentStatus;

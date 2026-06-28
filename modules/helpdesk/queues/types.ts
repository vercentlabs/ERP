import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type QueuesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type QueuesCreateInput = {
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

export type QueuesUpdateInput = Partial<Omit<QueuesCreateInput, "tenantId" | "code">>;

export type QueuesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: QueuesRecord["priority"];
};

export type QueuesActionContext = ActorContext & {
  reason?: string;
};

export type QueuesStatus = DocumentStatus;

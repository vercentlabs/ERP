import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DunningRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DunningCreateInput = {
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

export type DunningUpdateInput = Partial<Omit<DunningCreateInput, "tenantId" | "code">>;

export type DunningListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DunningRecord["priority"];
};

export type DunningActionContext = ActorContext & {
  reason?: string;
};

export type DunningStatus = DocumentStatus;

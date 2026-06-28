import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PutawayRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PutawayCreateInput = {
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

export type PutawayUpdateInput = Partial<Omit<PutawayCreateInput, "tenantId" | "code">>;

export type PutawayListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PutawayRecord["priority"];
};

export type PutawayActionContext = ActorContext & {
  reason?: string;
};

export type PutawayStatus = DocumentStatus;

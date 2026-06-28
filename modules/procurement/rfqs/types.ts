import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type RfqsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type RfqsCreateInput = {
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

export type RfqsUpdateInput = Partial<Omit<RfqsCreateInput, "tenantId" | "code">>;

export type RfqsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: RfqsRecord["priority"];
};

export type RfqsActionContext = ActorContext & {
  reason?: string;
};

export type RfqsStatus = DocumentStatus;

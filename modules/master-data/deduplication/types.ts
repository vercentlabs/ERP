import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DeduplicationRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DeduplicationCreateInput = {
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

export type DeduplicationUpdateInput = Partial<Omit<DeduplicationCreateInput, "tenantId" | "code">>;

export type DeduplicationListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DeduplicationRecord["priority"];
};

export type DeduplicationActionContext = ActorContext & {
  reason?: string;
};

export type DeduplicationStatus = DocumentStatus;

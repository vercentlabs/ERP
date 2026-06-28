import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type BinsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type BinsCreateInput = {
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

export type BinsUpdateInput = Partial<Omit<BinsCreateInput, "tenantId" | "code">>;

export type BinsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: BinsRecord["priority"];
};

export type BinsActionContext = ActorContext & {
  reason?: string;
};

export type BinsStatus = DocumentStatus;

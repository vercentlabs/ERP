import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ReturnsRepairsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ReturnsRepairsCreateInput = {
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

export type ReturnsRepairsUpdateInput = Partial<Omit<ReturnsRepairsCreateInput, "tenantId" | "code">>;

export type ReturnsRepairsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ReturnsRepairsRecord["priority"];
};

export type ReturnsRepairsActionContext = ActorContext & {
  reason?: string;
};

export type ReturnsRepairsStatus = DocumentStatus;

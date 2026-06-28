import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type WorkCentersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type WorkCentersCreateInput = {
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

export type WorkCentersUpdateInput = Partial<Omit<WorkCentersCreateInput, "tenantId" | "code">>;

export type WorkCentersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: WorkCentersRecord["priority"];
};

export type WorkCentersActionContext = ActorContext & {
  reason?: string;
};

export type WorkCentersStatus = DocumentStatus;

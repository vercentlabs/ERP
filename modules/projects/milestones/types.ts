import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type MilestonesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type MilestonesCreateInput = {
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

export type MilestonesUpdateInput = Partial<Omit<MilestonesCreateInput, "tenantId" | "code">>;

export type MilestonesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: MilestonesRecord["priority"];
};

export type MilestonesActionContext = ActorContext & {
  reason?: string;
};

export type MilestonesStatus = DocumentStatus;

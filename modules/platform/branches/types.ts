import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type BranchesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type BranchesCreateInput = {
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

export type BranchesUpdateInput = Partial<Omit<BranchesCreateInput, "tenantId" | "code">>;

export type BranchesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: BranchesRecord["priority"];
};

export type BranchesActionContext = ActorContext & {
  reason?: string;
};

export type BranchesStatus = DocumentStatus;

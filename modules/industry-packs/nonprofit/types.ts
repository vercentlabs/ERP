import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type NonprofitRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type NonprofitCreateInput = {
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

export type NonprofitUpdateInput = Partial<Omit<NonprofitCreateInput, "tenantId" | "code">>;

export type NonprofitListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: NonprofitRecord["priority"];
};

export type NonprofitActionContext = ActorContext & {
  reason?: string;
};

export type NonprofitStatus = DocumentStatus;

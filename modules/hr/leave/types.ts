import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type LeaveRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type LeaveCreateInput = {
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

export type LeaveUpdateInput = Partial<Omit<LeaveCreateInput, "tenantId" | "code">>;

export type LeaveListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: LeaveRecord["priority"];
};

export type LeaveActionContext = ActorContext & {
  reason?: string;
};

export type LeaveStatus = DocumentStatus;

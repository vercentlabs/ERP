import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type WorkflowApprovalsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type WorkflowApprovalsCreateInput = {
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

export type WorkflowApprovalsUpdateInput = Partial<Omit<WorkflowApprovalsCreateInput, "tenantId" | "code">>;

export type WorkflowApprovalsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: WorkflowApprovalsRecord["priority"];
};

export type WorkflowApprovalsActionContext = ActorContext & {
  reason?: string;
};

export type WorkflowApprovalsStatus = DocumentStatus;

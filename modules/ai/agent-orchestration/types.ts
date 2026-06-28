import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AgentOrchestrationRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AgentOrchestrationCreateInput = {
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

export type AgentOrchestrationUpdateInput = Partial<Omit<AgentOrchestrationCreateInput, "tenantId" | "code">>;

export type AgentOrchestrationListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AgentOrchestrationRecord["priority"];
};

export type AgentOrchestrationActionContext = ActorContext & {
  reason?: string;
};

export type AgentOrchestrationStatus = DocumentStatus;

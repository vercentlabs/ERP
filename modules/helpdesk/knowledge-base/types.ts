import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type KnowledgeBaseRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type KnowledgeBaseCreateInput = {
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

export type KnowledgeBaseUpdateInput = Partial<Omit<KnowledgeBaseCreateInput, "tenantId" | "code">>;

export type KnowledgeBaseListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: KnowledgeBaseRecord["priority"];
};

export type KnowledgeBaseActionContext = ActorContext & {
  reason?: string;
};

export type KnowledgeBaseStatus = DocumentStatus;

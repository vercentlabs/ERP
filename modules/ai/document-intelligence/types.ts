import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DocumentIntelligenceRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DocumentIntelligenceCreateInput = {
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

export type DocumentIntelligenceUpdateInput = Partial<Omit<DocumentIntelligenceCreateInput, "tenantId" | "code">>;

export type DocumentIntelligenceListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DocumentIntelligenceRecord["priority"];
};

export type DocumentIntelligenceActionContext = ActorContext & {
  reason?: string;
};

export type DocumentIntelligenceStatus = DocumentStatus;

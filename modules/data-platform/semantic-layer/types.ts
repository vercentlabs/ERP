import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SemanticLayerRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SemanticLayerCreateInput = {
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

export type SemanticLayerUpdateInput = Partial<Omit<SemanticLayerCreateInput, "tenantId" | "code">>;

export type SemanticLayerListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SemanticLayerRecord["priority"];
};

export type SemanticLayerActionContext = ActorContext & {
  reason?: string;
};

export type SemanticLayerStatus = DocumentStatus;

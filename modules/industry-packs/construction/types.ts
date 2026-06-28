import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ConstructionRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ConstructionCreateInput = {
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

export type ConstructionUpdateInput = Partial<Omit<ConstructionCreateInput, "tenantId" | "code">>;

export type ConstructionListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ConstructionRecord["priority"];
};

export type ConstructionActionContext = ActorContext & {
  reason?: string;
};

export type ConstructionStatus = DocumentStatus;

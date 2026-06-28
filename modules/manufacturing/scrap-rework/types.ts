import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ScrapReworkRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ScrapReworkCreateInput = {
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

export type ScrapReworkUpdateInput = Partial<Omit<ScrapReworkCreateInput, "tenantId" | "code">>;

export type ScrapReworkListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ScrapReworkRecord["priority"];
};

export type ScrapReworkActionContext = ActorContext & {
  reason?: string;
};

export type ScrapReworkStatus = DocumentStatus;

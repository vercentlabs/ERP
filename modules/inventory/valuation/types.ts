import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ValuationRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ValuationCreateInput = {
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

export type ValuationUpdateInput = Partial<Omit<ValuationCreateInput, "tenantId" | "code">>;

export type ValuationListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ValuationRecord["priority"];
};

export type ValuationActionContext = ActorContext & {
  reason?: string;
};

export type ValuationStatus = DocumentStatus;

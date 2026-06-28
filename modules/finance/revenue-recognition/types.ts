import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type RevenueRecognitionRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type RevenueRecognitionCreateInput = {
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

export type RevenueRecognitionUpdateInput = Partial<Omit<RevenueRecognitionCreateInput, "tenantId" | "code">>;

export type RevenueRecognitionListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: RevenueRecognitionRecord["priority"];
};

export type RevenueRecognitionActionContext = ActorContext & {
  reason?: string;
};

export type RevenueRecognitionStatus = DocumentStatus;

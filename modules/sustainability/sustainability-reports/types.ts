import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SustainabilityReportsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SustainabilityReportsCreateInput = {
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

export type SustainabilityReportsUpdateInput = Partial<Omit<SustainabilityReportsCreateInput, "tenantId" | "code">>;

export type SustainabilityReportsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SustainabilityReportsRecord["priority"];
};

export type SustainabilityReportsActionContext = ActorContext & {
  reason?: string;
};

export type SustainabilityReportsStatus = DocumentStatus;

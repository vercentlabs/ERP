import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type InspectionPlansRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type InspectionPlansCreateInput = {
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

export type InspectionPlansUpdateInput = Partial<Omit<InspectionPlansCreateInput, "tenantId" | "code">>;

export type InspectionPlansListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: InspectionPlansRecord["priority"];
};

export type InspectionPlansActionContext = ActorContext & {
  reason?: string;
};

export type InspectionPlansStatus = DocumentStatus;

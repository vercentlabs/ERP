import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type EducationRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type EducationCreateInput = {
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

export type EducationUpdateInput = Partial<Omit<EducationCreateInput, "tenantId" | "code">>;

export type EducationListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: EducationRecord["priority"];
};

export type EducationActionContext = ActorContext & {
  reason?: string;
};

export type EducationStatus = DocumentStatus;

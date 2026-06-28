import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type HealthcareRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type HealthcareCreateInput = {
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

export type HealthcareUpdateInput = Partial<Omit<HealthcareCreateInput, "tenantId" | "code">>;

export type HealthcareListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: HealthcareRecord["priority"];
};

export type HealthcareActionContext = ActorContext & {
  reason?: string;
};

export type HealthcareStatus = DocumentStatus;

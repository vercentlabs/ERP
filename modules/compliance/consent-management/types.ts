import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ConsentManagementRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ConsentManagementCreateInput = {
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

export type ConsentManagementUpdateInput = Partial<Omit<ConsentManagementCreateInput, "tenantId" | "code">>;

export type ConsentManagementListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ConsentManagementRecord["priority"];
};

export type ConsentManagementActionContext = ActorContext & {
  reason?: string;
};

export type ConsentManagementStatus = DocumentStatus;

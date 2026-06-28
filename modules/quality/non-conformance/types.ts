import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type NonConformanceRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type NonConformanceCreateInput = {
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

export type NonConformanceUpdateInput = Partial<Omit<NonConformanceCreateInput, "tenantId" | "code">>;

export type NonConformanceListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: NonConformanceRecord["priority"];
};

export type NonConformanceActionContext = ActorContext & {
  reason?: string;
};

export type NonConformanceStatus = DocumentStatus;

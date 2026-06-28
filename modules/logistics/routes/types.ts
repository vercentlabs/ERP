import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type RoutesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type RoutesCreateInput = {
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

export type RoutesUpdateInput = Partial<Omit<RoutesCreateInput, "tenantId" | "code">>;

export type RoutesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: RoutesRecord["priority"];
};

export type RoutesActionContext = ActorContext & {
  reason?: string;
};

export type RoutesStatus = DocumentStatus;

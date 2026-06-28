import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type IncidentsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type IncidentsCreateInput = {
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

export type IncidentsUpdateInput = Partial<Omit<IncidentsCreateInput, "tenantId" | "code">>;

export type IncidentsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: IncidentsRecord["priority"];
};

export type IncidentsActionContext = ActorContext & {
  reason?: string;
};

export type IncidentsStatus = DocumentStatus;

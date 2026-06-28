import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type NamingSeriesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type NamingSeriesCreateInput = {
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

export type NamingSeriesUpdateInput = Partial<Omit<NamingSeriesCreateInput, "tenantId" | "code">>;

export type NamingSeriesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: NamingSeriesRecord["priority"];
};

export type NamingSeriesActionContext = ActorContext & {
  reason?: string;
};

export type NamingSeriesStatus = DocumentStatus;

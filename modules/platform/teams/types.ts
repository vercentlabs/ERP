import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type TeamsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type TeamsCreateInput = {
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

export type TeamsUpdateInput = Partial<Omit<TeamsCreateInput, "tenantId" | "code">>;

export type TeamsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: TeamsRecord["priority"];
};

export type TeamsActionContext = ActorContext & {
  reason?: string;
};

export type TeamsStatus = DocumentStatus;

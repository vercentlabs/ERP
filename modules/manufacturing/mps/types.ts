import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type MpsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type MpsCreateInput = {
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

export type MpsUpdateInput = Partial<Omit<MpsCreateInput, "tenantId" | "code">>;

export type MpsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: MpsRecord["priority"];
};

export type MpsActionContext = ActorContext & {
  reason?: string;
};

export type MpsStatus = DocumentStatus;

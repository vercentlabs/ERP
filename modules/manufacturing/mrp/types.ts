import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type MrpRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type MrpCreateInput = {
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

export type MrpUpdateInput = Partial<Omit<MrpCreateInput, "tenantId" | "code">>;

export type MrpListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: MrpRecord["priority"];
};

export type MrpActionContext = ActorContext & {
  reason?: string;
};

export type MrpStatus = DocumentStatus;

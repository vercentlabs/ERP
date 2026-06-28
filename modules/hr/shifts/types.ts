import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ShiftsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ShiftsCreateInput = {
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

export type ShiftsUpdateInput = Partial<Omit<ShiftsCreateInput, "tenantId" | "code">>;

export type ShiftsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ShiftsRecord["priority"];
};

export type ShiftsActionContext = ActorContext & {
  reason?: string;
};

export type ShiftsStatus = DocumentStatus;

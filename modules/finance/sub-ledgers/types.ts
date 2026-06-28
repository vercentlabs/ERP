import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SubLedgersRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SubLedgersCreateInput = {
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

export type SubLedgersUpdateInput = Partial<Omit<SubLedgersCreateInput, "tenantId" | "code">>;

export type SubLedgersListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SubLedgersRecord["priority"];
};

export type SubLedgersActionContext = ActorContext & {
  reason?: string;
};

export type SubLedgersStatus = DocumentStatus;

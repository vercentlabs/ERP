import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CdcRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CdcCreateInput = {
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

export type CdcUpdateInput = Partial<Omit<CdcCreateInput, "tenantId" | "code">>;

export type CdcListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CdcRecord["priority"];
};

export type CdcActionContext = ActorContext & {
  reason?: string;
};

export type CdcStatus = DocumentStatus;

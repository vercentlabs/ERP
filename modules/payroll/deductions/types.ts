import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DeductionsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DeductionsCreateInput = {
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

export type DeductionsUpdateInput = Partial<Omit<DeductionsCreateInput, "tenantId" | "code">>;

export type DeductionsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DeductionsRecord["priority"];
};

export type DeductionsActionContext = ActorContext & {
  reason?: string;
};

export type DeductionsStatus = DocumentStatus;

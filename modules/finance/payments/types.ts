import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PaymentsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PaymentsCreateInput = {
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

export type PaymentsUpdateInput = Partial<Omit<PaymentsCreateInput, "tenantId" | "code">>;

export type PaymentsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PaymentsRecord["priority"];
};

export type PaymentsActionContext = ActorContext & {
  reason?: string;
};

export type PaymentsStatus = DocumentStatus;

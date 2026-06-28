import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type FieldInvoicingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type FieldInvoicingCreateInput = {
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

export type FieldInvoicingUpdateInput = Partial<Omit<FieldInvoicingCreateInput, "tenantId" | "code">>;

export type FieldInvoicingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: FieldInvoicingRecord["priority"];
};

export type FieldInvoicingActionContext = ActorContext & {
  reason?: string;
};

export type FieldInvoicingStatus = DocumentStatus;

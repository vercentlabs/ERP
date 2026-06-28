import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type BankReconciliationRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type BankReconciliationCreateInput = {
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

export type BankReconciliationUpdateInput = Partial<Omit<BankReconciliationCreateInput, "tenantId" | "code">>;

export type BankReconciliationListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: BankReconciliationRecord["priority"];
};

export type BankReconciliationActionContext = ActorContext & {
  reason?: string;
};

export type BankReconciliationStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CheckoutRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CheckoutCreateInput = {
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

export type CheckoutUpdateInput = Partial<Omit<CheckoutCreateInput, "tenantId" | "code">>;

export type CheckoutListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CheckoutRecord["priority"];
};

export type CheckoutActionContext = ActorContext & {
  reason?: string;
};

export type CheckoutStatus = DocumentStatus;

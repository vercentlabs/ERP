import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ReplenishmentRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ReplenishmentCreateInput = {
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

export type ReplenishmentUpdateInput = Partial<Omit<ReplenishmentCreateInput, "tenantId" | "code">>;

export type ReplenishmentListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ReplenishmentRecord["priority"];
};

export type ReplenishmentActionContext = ActorContext & {
  reason?: string;
};

export type ReplenishmentStatus = DocumentStatus;

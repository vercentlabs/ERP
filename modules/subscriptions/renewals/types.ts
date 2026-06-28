import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type RenewalsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type RenewalsCreateInput = {
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

export type RenewalsUpdateInput = Partial<Omit<RenewalsCreateInput, "tenantId" | "code">>;

export type RenewalsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: RenewalsRecord["priority"];
};

export type RenewalsActionContext = ActorContext & {
  reason?: string;
};

export type RenewalsStatus = DocumentStatus;

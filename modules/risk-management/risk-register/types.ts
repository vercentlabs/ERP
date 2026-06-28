import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type RiskRegisterRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type RiskRegisterCreateInput = {
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

export type RiskRegisterUpdateInput = Partial<Omit<RiskRegisterCreateInput, "tenantId" | "code">>;

export type RiskRegisterListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: RiskRegisterRecord["priority"];
};

export type RiskRegisterActionContext = ActorContext & {
  reason?: string;
};

export type RiskRegisterStatus = DocumentStatus;

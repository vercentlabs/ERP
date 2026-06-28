import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type PayslipsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type PayslipsCreateInput = {
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

export type PayslipsUpdateInput = Partial<Omit<PayslipsCreateInput, "tenantId" | "code">>;

export type PayslipsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: PayslipsRecord["priority"];
};

export type PayslipsActionContext = ActorContext & {
  reason?: string;
};

export type PayslipsStatus = DocumentStatus;

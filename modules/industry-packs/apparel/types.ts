import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ApparelRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ApparelCreateInput = {
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

export type ApparelUpdateInput = Partial<Omit<ApparelCreateInput, "tenantId" | "code">>;

export type ApparelListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ApparelRecord["priority"];
};

export type ApparelActionContext = ActorContext & {
  reason?: string;
};

export type ApparelStatus = DocumentStatus;

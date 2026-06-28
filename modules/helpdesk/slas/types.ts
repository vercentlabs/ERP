import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type SlasRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type SlasCreateInput = {
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

export type SlasUpdateInput = Partial<Omit<SlasCreateInput, "tenantId" | "code">>;

export type SlasListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: SlasRecord["priority"];
};

export type SlasActionContext = ActorContext & {
  reason?: string;
};

export type SlasStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AutomotiveRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AutomotiveCreateInput = {
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

export type AutomotiveUpdateInput = Partial<Omit<AutomotiveCreateInput, "tenantId" | "code">>;

export type AutomotiveListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AutomotiveRecord["priority"];
};

export type AutomotiveActionContext = ActorContext & {
  reason?: string;
};

export type AutomotiveStatus = DocumentStatus;

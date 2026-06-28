import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type InternalControlsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type InternalControlsCreateInput = {
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

export type InternalControlsUpdateInput = Partial<Omit<InternalControlsCreateInput, "tenantId" | "code">>;

export type InternalControlsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: InternalControlsRecord["priority"];
};

export type InternalControlsActionContext = ActorContext & {
  reason?: string;
};

export type InternalControlsStatus = DocumentStatus;

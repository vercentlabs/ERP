import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ControlsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ControlsCreateInput = {
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

export type ControlsUpdateInput = Partial<Omit<ControlsCreateInput, "tenantId" | "code">>;

export type ControlsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ControlsRecord["priority"];
};

export type ControlsActionContext = ActorContext & {
  reason?: string;
};

export type ControlsStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DesignationsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DesignationsCreateInput = {
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

export type DesignationsUpdateInput = Partial<Omit<DesignationsCreateInput, "tenantId" | "code">>;

export type DesignationsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DesignationsRecord["priority"];
};

export type DesignationsActionContext = ActorContext & {
  reason?: string;
};

export type DesignationsStatus = DocumentStatus;

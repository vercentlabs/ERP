import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type UomMasterRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type UomMasterCreateInput = {
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

export type UomMasterUpdateInput = Partial<Omit<UomMasterCreateInput, "tenantId" | "code">>;

export type UomMasterListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: UomMasterRecord["priority"];
};

export type UomMasterActionContext = ActorContext & {
  reason?: string;
};

export type UomMasterStatus = DocumentStatus;

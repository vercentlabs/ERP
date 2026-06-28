import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DataGovernanceRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DataGovernanceCreateInput = {
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

export type DataGovernanceUpdateInput = Partial<Omit<DataGovernanceCreateInput, "tenantId" | "code">>;

export type DataGovernanceListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DataGovernanceRecord["priority"];
};

export type DataGovernanceActionContext = ActorContext & {
  reason?: string;
};

export type DataGovernanceStatus = DocumentStatus;

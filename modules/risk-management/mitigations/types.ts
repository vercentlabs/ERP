import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type MitigationsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type MitigationsCreateInput = {
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

export type MitigationsUpdateInput = Partial<Omit<MitigationsCreateInput, "tenantId" | "code">>;

export type MitigationsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: MitigationsRecord["priority"];
};

export type MitigationsActionContext = ActorContext & {
  reason?: string;
};

export type MitigationsStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type EscalationsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type EscalationsCreateInput = {
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

export type EscalationsUpdateInput = Partial<Omit<EscalationsCreateInput, "tenantId" | "code">>;

export type EscalationsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: EscalationsRecord["priority"];
};

export type EscalationsActionContext = ActorContext & {
  reason?: string;
};

export type EscalationsStatus = DocumentStatus;

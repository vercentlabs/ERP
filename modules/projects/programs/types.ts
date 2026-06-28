import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProgramsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProgramsCreateInput = {
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

export type ProgramsUpdateInput = Partial<Omit<ProgramsCreateInput, "tenantId" | "code">>;

export type ProgramsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProgramsRecord["priority"];
};

export type ProgramsActionContext = ActorContext & {
  reason?: string;
};

export type ProgramsStatus = DocumentStatus;

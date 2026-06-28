import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type WavesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type WavesCreateInput = {
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

export type WavesUpdateInput = Partial<Omit<WavesCreateInput, "tenantId" | "code">>;

export type WavesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: WavesRecord["priority"];
};

export type WavesActionContext = ActorContext & {
  reason?: string;
};

export type WavesStatus = DocumentStatus;

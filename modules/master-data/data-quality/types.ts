import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DataQualityRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DataQualityCreateInput = {
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

export type DataQualityUpdateInput = Partial<Omit<DataQualityCreateInput, "tenantId" | "code">>;

export type DataQualityListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DataQualityRecord["priority"];
};

export type DataQualityActionContext = ActorContext & {
  reason?: string;
};

export type DataQualityStatus = DocumentStatus;

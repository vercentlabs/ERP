import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CustomerQualityRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CustomerQualityCreateInput = {
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

export type CustomerQualityUpdateInput = Partial<Omit<CustomerQualityCreateInput, "tenantId" | "code">>;

export type CustomerQualityListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CustomerQualityRecord["priority"];
};

export type CustomerQualityActionContext = ActorContext & {
  reason?: string;
};

export type CustomerQualityStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AnomalyDetectionRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AnomalyDetectionCreateInput = {
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

export type AnomalyDetectionUpdateInput = Partial<Omit<AnomalyDetectionCreateInput, "tenantId" | "code">>;

export type AnomalyDetectionListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AnomalyDetectionRecord["priority"];
};

export type AnomalyDetectionActionContext = ActorContext & {
  reason?: string;
};

export type AnomalyDetectionStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type MobileScanningRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type MobileScanningCreateInput = {
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

export type MobileScanningUpdateInput = Partial<Omit<MobileScanningCreateInput, "tenantId" | "code">>;

export type MobileScanningListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: MobileScanningRecord["priority"];
};

export type MobileScanningActionContext = ActorContext & {
  reason?: string;
};

export type MobileScanningStatus = DocumentStatus;

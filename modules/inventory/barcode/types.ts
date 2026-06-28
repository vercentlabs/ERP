import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type BarcodeRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type BarcodeCreateInput = {
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

export type BarcodeUpdateInput = Partial<Omit<BarcodeCreateInput, "tenantId" | "code">>;

export type BarcodeListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: BarcodeRecord["priority"];
};

export type BarcodeActionContext = ActorContext & {
  reason?: string;
};

export type BarcodeStatus = DocumentStatus;

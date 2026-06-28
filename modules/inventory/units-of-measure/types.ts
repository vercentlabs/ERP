import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type UnitsOfMeasureRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type UnitsOfMeasureCreateInput = {
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

export type UnitsOfMeasureUpdateInput = Partial<Omit<UnitsOfMeasureCreateInput, "tenantId" | "code">>;

export type UnitsOfMeasureListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: UnitsOfMeasureRecord["priority"];
};

export type UnitsOfMeasureActionContext = ActorContext & {
  reason?: string;
};

export type UnitsOfMeasureStatus = DocumentStatus;

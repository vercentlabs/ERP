import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type FreightRatesRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type FreightRatesCreateInput = {
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

export type FreightRatesUpdateInput = Partial<Omit<FreightRatesCreateInput, "tenantId" | "code">>;

export type FreightRatesListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: FreightRatesRecord["priority"];
};

export type FreightRatesActionContext = ActorContext & {
  reason?: string;
};

export type FreightRatesStatus = DocumentStatus;

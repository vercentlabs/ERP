import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type EnergyUsageRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type EnergyUsageCreateInput = {
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

export type EnergyUsageUpdateInput = Partial<Omit<EnergyUsageCreateInput, "tenantId" | "code">>;

export type EnergyUsageListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: EnergyUsageRecord["priority"];
};

export type EnergyUsageActionContext = ActorContext & {
  reason?: string;
};

export type EnergyUsageStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type LocationsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type LocationsCreateInput = {
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

export type LocationsUpdateInput = Partial<Omit<LocationsCreateInput, "tenantId" | "code">>;

export type LocationsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: LocationsRecord["priority"];
};

export type LocationsActionContext = ActorContext & {
  reason?: string;
};

export type LocationsStatus = DocumentStatus;

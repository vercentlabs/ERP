import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type RoutingsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type RoutingsCreateInput = {
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

export type RoutingsUpdateInput = Partial<Omit<RoutingsCreateInput, "tenantId" | "code">>;

export type RoutingsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: RoutingsRecord["priority"];
};

export type RoutingsActionContext = ActorContext & {
  reason?: string;
};

export type RoutingsStatus = DocumentStatus;

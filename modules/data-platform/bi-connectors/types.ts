import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type BiConnectorsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type BiConnectorsCreateInput = {
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

export type BiConnectorsUpdateInput = Partial<Omit<BiConnectorsCreateInput, "tenantId" | "code">>;

export type BiConnectorsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: BiConnectorsRecord["priority"];
};

export type BiConnectorsActionContext = ActorContext & {
  reason?: string;
};

export type BiConnectorsStatus = DocumentStatus;

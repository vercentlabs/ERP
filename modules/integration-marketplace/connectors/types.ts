import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ConnectorsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ConnectorsCreateInput = {
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

export type ConnectorsUpdateInput = Partial<Omit<ConnectorsCreateInput, "tenantId" | "code">>;

export type ConnectorsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ConnectorsRecord["priority"];
};

export type ConnectorsActionContext = ActorContext & {
  reason?: string;
};

export type ConnectorsStatus = DocumentStatus;

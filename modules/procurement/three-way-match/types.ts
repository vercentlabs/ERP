import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ThreeWayMatchRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ThreeWayMatchCreateInput = {
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

export type ThreeWayMatchUpdateInput = Partial<Omit<ThreeWayMatchCreateInput, "tenantId" | "code">>;

export type ThreeWayMatchListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ThreeWayMatchRecord["priority"];
};

export type ThreeWayMatchActionContext = ActorContext & {
  reason?: string;
};

export type ThreeWayMatchStatus = DocumentStatus;

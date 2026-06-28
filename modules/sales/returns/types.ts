import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ReturnsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ReturnsCreateInput = {
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

export type ReturnsUpdateInput = Partial<Omit<ReturnsCreateInput, "tenantId" | "code">>;

export type ReturnsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ReturnsRecord["priority"];
};

export type ReturnsActionContext = ActorContext & {
  reason?: string;
};

export type ReturnsStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type TicketsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type TicketsCreateInput = {
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

export type TicketsUpdateInput = Partial<Omit<TicketsCreateInput, "tenantId" | "code">>;

export type TicketsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: TicketsRecord["priority"];
};

export type TicketsActionContext = ActorContext & {
  reason?: string;
};

export type TicketsStatus = DocumentStatus;

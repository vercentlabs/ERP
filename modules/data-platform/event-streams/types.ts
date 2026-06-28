import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type EventStreamsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type EventStreamsCreateInput = {
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

export type EventStreamsUpdateInput = Partial<Omit<EventStreamsCreateInput, "tenantId" | "code">>;

export type EventStreamsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: EventStreamsRecord["priority"];
};

export type EventStreamsActionContext = ActorContext & {
  reason?: string;
};

export type EventStreamsStatus = DocumentStatus;

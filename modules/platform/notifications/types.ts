import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type NotificationsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type NotificationsCreateInput = {
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

export type NotificationsUpdateInput = Partial<Omit<NotificationsCreateInput, "tenantId" | "code">>;

export type NotificationsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: NotificationsRecord["priority"];
};

export type NotificationsActionContext = ActorContext & {
  reason?: string;
};

export type NotificationsStatus = DocumentStatus;

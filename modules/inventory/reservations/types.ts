import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ReservationsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ReservationsCreateInput = {
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

export type ReservationsUpdateInput = Partial<Omit<ReservationsCreateInput, "tenantId" | "code">>;

export type ReservationsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ReservationsRecord["priority"];
};

export type ReservationsActionContext = ActorContext & {
  reason?: string;
};

export type ReservationsStatus = DocumentStatus;

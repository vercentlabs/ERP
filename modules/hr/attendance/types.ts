import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AttendanceRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AttendanceCreateInput = {
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

export type AttendanceUpdateInput = Partial<Omit<AttendanceCreateInput, "tenantId" | "code">>;

export type AttendanceListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AttendanceRecord["priority"];
};

export type AttendanceActionContext = ActorContext & {
  reason?: string;
};

export type AttendanceStatus = DocumentStatus;

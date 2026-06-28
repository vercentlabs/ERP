import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type MobileJobsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type MobileJobsCreateInput = {
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

export type MobileJobsUpdateInput = Partial<Omit<MobileJobsCreateInput, "tenantId" | "code">>;

export type MobileJobsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: MobileJobsRecord["priority"];
};

export type MobileJobsActionContext = ActorContext & {
  reason?: string;
};

export type MobileJobsStatus = DocumentStatus;

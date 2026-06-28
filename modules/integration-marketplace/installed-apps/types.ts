import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type InstalledAppsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type InstalledAppsCreateInput = {
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

export type InstalledAppsUpdateInput = Partial<Omit<InstalledAppsCreateInput, "tenantId" | "code">>;

export type InstalledAppsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: InstalledAppsRecord["priority"];
};

export type InstalledAppsActionContext = ActorContext & {
  reason?: string;
};

export type InstalledAppsStatus = DocumentStatus;

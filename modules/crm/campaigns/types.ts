import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type CampaignsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type CampaignsCreateInput = {
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

export type CampaignsUpdateInput = Partial<Omit<CampaignsCreateInput, "tenantId" | "code">>;

export type CampaignsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: CampaignsRecord["priority"];
};

export type CampaignsActionContext = ActorContext & {
  reason?: string;
};

export type CampaignsStatus = DocumentStatus;

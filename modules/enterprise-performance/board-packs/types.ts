import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type BoardPacksRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type BoardPacksCreateInput = {
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

export type BoardPacksUpdateInput = Partial<Omit<BoardPacksCreateInput, "tenantId" | "code">>;

export type BoardPacksListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: BoardPacksRecord["priority"];
};

export type BoardPacksActionContext = ActorContext & {
  reason?: string;
};

export type BoardPacksStatus = DocumentStatus;

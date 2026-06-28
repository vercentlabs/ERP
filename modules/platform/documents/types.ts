import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type DocumentsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type DocumentsCreateInput = {
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

export type DocumentsUpdateInput = Partial<Omit<DocumentsCreateInput, "tenantId" | "code">>;

export type DocumentsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: DocumentsRecord["priority"];
};

export type DocumentsActionContext = ActorContext & {
  reason?: string;
};

export type DocumentsStatus = DocumentStatus;

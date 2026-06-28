import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ContactsRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ContactsCreateInput = {
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

export type ContactsUpdateInput = Partial<Omit<ContactsCreateInput, "tenantId" | "code">>;

export type ContactsListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ContactsRecord["priority"];
};

export type ContactsActionContext = ActorContext & {
  reason?: string;
};

export type ContactsStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type AddressBookRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type AddressBookCreateInput = {
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

export type AddressBookUpdateInput = Partial<Omit<AddressBookCreateInput, "tenantId" | "code">>;

export type AddressBookListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: AddressBookRecord["priority"];
};

export type AddressBookActionContext = ActorContext & {
  reason?: string;
};

export type AddressBookStatus = DocumentStatus;

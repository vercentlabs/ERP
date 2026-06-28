import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type Customer360Record = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type Customer360CreateInput = {
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

export type Customer360UpdateInput = Partial<Omit<Customer360CreateInput, "tenantId" | "code">>;

export type Customer360ListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: Customer360Record["priority"];
};

export type Customer360ActionContext = ActorContext & {
  reason?: string;
};

export type Customer360Status = DocumentStatus;

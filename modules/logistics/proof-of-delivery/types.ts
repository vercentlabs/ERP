import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type ProofOfDeliveryRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type ProofOfDeliveryCreateInput = {
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

export type ProofOfDeliveryUpdateInput = Partial<Omit<ProofOfDeliveryCreateInput, "tenantId" | "code">>;

export type ProofOfDeliveryListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: ProofOfDeliveryRecord["priority"];
};

export type ProofOfDeliveryActionContext = ActorContext & {
  reason?: string;
};

export type ProofOfDeliveryStatus = DocumentStatus;

import type { ActorContext, DocumentStatus, ErpRecord, PageRequest } from "@vercent/shared-types";

export type OnboardingRecord = ErpRecord<{
  description?: string;
  amount?: number;
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  source?: string;
}>;

export type OnboardingCreateInput = {
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

export type OnboardingUpdateInput = Partial<Omit<OnboardingCreateInput, "tenantId" | "code">>;

export type OnboardingListRequest = PageRequest & {
  tenantId: string;
  ownerId?: string;
  priority?: OnboardingRecord["priority"];
};

export type OnboardingActionContext = ActorContext & {
  reason?: string;
};

export type OnboardingStatus = DocumentStatus;

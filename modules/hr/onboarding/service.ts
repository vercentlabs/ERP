import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { onboardingRepository } from "./repository";
import { onboardingCreateSchema, onboardingListSchema, onboardingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { OnboardingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const onboardingService = {
  async list(input: unknown) {
    return onboardingRepository.list(onboardingListSchema.parse(input));
  },

  async create(input: unknown, context: OnboardingActionContext) {
    const parsed = onboardingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return onboardingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: OnboardingActionContext) {
    const current = await onboardingRepository.getById(tenantId, id);
    if (!current) throw new Error("Onboarding record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return onboardingRepository.update(tenantId, id, onboardingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: OnboardingActionContext) {
    const current = await onboardingRepository.getById(tenantId, id);
    if (!current) throw new Error("Onboarding record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return onboardingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await onboardingRepository.getById(tenantId, id);
    if (!record) throw new Error("Onboarding record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

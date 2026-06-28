import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { benefitsRepository } from "./repository";
import { benefitsCreateSchema, benefitsListSchema, benefitsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { BenefitsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const benefitsService = {
  async list(input: unknown) {
    return benefitsRepository.list(benefitsListSchema.parse(input));
  },

  async create(input: unknown, context: BenefitsActionContext) {
    const parsed = benefitsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return benefitsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: BenefitsActionContext) {
    const current = await benefitsRepository.getById(tenantId, id);
    if (!current) throw new Error("Benefits record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return benefitsRepository.update(tenantId, id, benefitsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: BenefitsActionContext) {
    const current = await benefitsRepository.getById(tenantId, id);
    if (!current) throw new Error("Benefits record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return benefitsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await benefitsRepository.getById(tenantId, id);
    if (!record) throw new Error("Benefits record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { plansRepository } from "./repository";
import { plansCreateSchema, plansListSchema, plansUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PlansActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const plansService = {
  async list(input: unknown) {
    return plansRepository.list(plansListSchema.parse(input));
  },

  async create(input: unknown, context: PlansActionContext) {
    const parsed = plansCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return plansRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PlansActionContext) {
    const current = await plansRepository.getById(tenantId, id);
    if (!current) throw new Error("Plans record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return plansRepository.update(tenantId, id, plansUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PlansActionContext) {
    const current = await plansRepository.getById(tenantId, id);
    if (!current) throw new Error("Plans record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return plansRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await plansRepository.getById(tenantId, id);
    if (!record) throw new Error("Plans record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

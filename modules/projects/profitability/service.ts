import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { profitabilityRepository } from "./repository";
import { profitabilityCreateSchema, profitabilityListSchema, profitabilityUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProfitabilityActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const profitabilityService = {
  async list(input: unknown) {
    return profitabilityRepository.list(profitabilityListSchema.parse(input));
  },

  async create(input: unknown, context: ProfitabilityActionContext) {
    const parsed = profitabilityCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return profitabilityRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProfitabilityActionContext) {
    const current = await profitabilityRepository.getById(tenantId, id);
    if (!current) throw new Error("Profitability record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return profitabilityRepository.update(tenantId, id, profitabilityUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProfitabilityActionContext) {
    const current = await profitabilityRepository.getById(tenantId, id);
    if (!current) throw new Error("Profitability record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return profitabilityRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await profitabilityRepository.getById(tenantId, id);
    if (!record) throw new Error("Profitability record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

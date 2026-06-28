import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { profitCentersRepository } from "./repository";
import { profitCentersCreateSchema, profitCentersListSchema, profitCentersUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProfitCentersActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const profitCentersService = {
  async list(input: unknown) {
    return profitCentersRepository.list(profitCentersListSchema.parse(input));
  },

  async create(input: unknown, context: ProfitCentersActionContext) {
    const parsed = profitCentersCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return profitCentersRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProfitCentersActionContext) {
    const current = await profitCentersRepository.getById(tenantId, id);
    if (!current) throw new Error("Profit Centers record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return profitCentersRepository.update(tenantId, id, profitCentersUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProfitCentersActionContext) {
    const current = await profitCentersRepository.getById(tenantId, id);
    if (!current) throw new Error("Profit Centers record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return profitCentersRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await profitCentersRepository.getById(tenantId, id);
    if (!record) throw new Error("Profit Centers record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

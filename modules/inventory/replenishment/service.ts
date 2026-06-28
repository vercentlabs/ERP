import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { replenishmentRepository } from "./repository";
import { replenishmentCreateSchema, replenishmentListSchema, replenishmentUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ReplenishmentActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const replenishmentService = {
  async list(input: unknown) {
    return replenishmentRepository.list(replenishmentListSchema.parse(input));
  },

  async create(input: unknown, context: ReplenishmentActionContext) {
    const parsed = replenishmentCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return replenishmentRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ReplenishmentActionContext) {
    const current = await replenishmentRepository.getById(tenantId, id);
    if (!current) throw new Error("Replenishment record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return replenishmentRepository.update(tenantId, id, replenishmentUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ReplenishmentActionContext) {
    const current = await replenishmentRepository.getById(tenantId, id);
    if (!current) throw new Error("Replenishment record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return replenishmentRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await replenishmentRepository.getById(tenantId, id);
    if (!record) throw new Error("Replenishment record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

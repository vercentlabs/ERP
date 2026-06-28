import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { replenishmentTasksRepository } from "./repository";
import { replenishmentTasksCreateSchema, replenishmentTasksListSchema, replenishmentTasksUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ReplenishmentTasksActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const replenishmentTasksService = {
  async list(input: unknown) {
    return replenishmentTasksRepository.list(replenishmentTasksListSchema.parse(input));
  },

  async create(input: unknown, context: ReplenishmentTasksActionContext) {
    const parsed = replenishmentTasksCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return replenishmentTasksRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ReplenishmentTasksActionContext) {
    const current = await replenishmentTasksRepository.getById(tenantId, id);
    if (!current) throw new Error("Replenishment Tasks record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return replenishmentTasksRepository.update(tenantId, id, replenishmentTasksUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ReplenishmentTasksActionContext) {
    const current = await replenishmentTasksRepository.getById(tenantId, id);
    if (!current) throw new Error("Replenishment Tasks record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return replenishmentTasksRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await replenishmentTasksRepository.getById(tenantId, id);
    if (!record) throw new Error("Replenishment Tasks record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

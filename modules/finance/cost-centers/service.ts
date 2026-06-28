import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { costCentersRepository } from "./repository";
import { costCentersCreateSchema, costCentersListSchema, costCentersUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CostCentersActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const costCentersService = {
  async list(input: unknown) {
    return costCentersRepository.list(costCentersListSchema.parse(input));
  },

  async create(input: unknown, context: CostCentersActionContext) {
    const parsed = costCentersCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return costCentersRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CostCentersActionContext) {
    const current = await costCentersRepository.getById(tenantId, id);
    if (!current) throw new Error("Cost Centers record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return costCentersRepository.update(tenantId, id, costCentersUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CostCentersActionContext) {
    const current = await costCentersRepository.getById(tenantId, id);
    if (!current) throw new Error("Cost Centers record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return costCentersRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await costCentersRepository.getById(tenantId, id);
    if (!record) throw new Error("Cost Centers record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

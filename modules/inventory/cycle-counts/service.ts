import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { cycleCountsRepository } from "./repository";
import { cycleCountsCreateSchema, cycleCountsListSchema, cycleCountsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CycleCountsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const cycleCountsService = {
  async list(input: unknown) {
    return cycleCountsRepository.list(cycleCountsListSchema.parse(input));
  },

  async create(input: unknown, context: CycleCountsActionContext) {
    const parsed = cycleCountsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return cycleCountsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CycleCountsActionContext) {
    const current = await cycleCountsRepository.getById(tenantId, id);
    if (!current) throw new Error("Cycle Counts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return cycleCountsRepository.update(tenantId, id, cycleCountsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CycleCountsActionContext) {
    const current = await cycleCountsRepository.getById(tenantId, id);
    if (!current) throw new Error("Cycle Counts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return cycleCountsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await cycleCountsRepository.getById(tenantId, id);
    if (!record) throw new Error("Cycle Counts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

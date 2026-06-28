import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { deferredRevenueRepository } from "./repository";
import { deferredRevenueCreateSchema, deferredRevenueListSchema, deferredRevenueUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DeferredRevenueActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const deferredRevenueService = {
  async list(input: unknown) {
    return deferredRevenueRepository.list(deferredRevenueListSchema.parse(input));
  },

  async create(input: unknown, context: DeferredRevenueActionContext) {
    const parsed = deferredRevenueCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return deferredRevenueRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DeferredRevenueActionContext) {
    const current = await deferredRevenueRepository.getById(tenantId, id);
    if (!current) throw new Error("Deferred Revenue record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return deferredRevenueRepository.update(tenantId, id, deferredRevenueUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DeferredRevenueActionContext) {
    const current = await deferredRevenueRepository.getById(tenantId, id);
    if (!current) throw new Error("Deferred Revenue record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return deferredRevenueRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await deferredRevenueRepository.getById(tenantId, id);
    if (!record) throw new Error("Deferred Revenue record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { lifecycleCostingRepository } from "./repository";
import { lifecycleCostingCreateSchema, lifecycleCostingListSchema, lifecycleCostingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { LifecycleCostingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const lifecycleCostingService = {
  async list(input: unknown) {
    return lifecycleCostingRepository.list(lifecycleCostingListSchema.parse(input));
  },

  async create(input: unknown, context: LifecycleCostingActionContext) {
    const parsed = lifecycleCostingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return lifecycleCostingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: LifecycleCostingActionContext) {
    const current = await lifecycleCostingRepository.getById(tenantId, id);
    if (!current) throw new Error("Lifecycle Costing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return lifecycleCostingRepository.update(tenantId, id, lifecycleCostingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: LifecycleCostingActionContext) {
    const current = await lifecycleCostingRepository.getById(tenantId, id);
    if (!current) throw new Error("Lifecycle Costing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return lifecycleCostingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await lifecycleCostingRepository.getById(tenantId, id);
    if (!record) throw new Error("Lifecycle Costing record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { pickingRepository } from "./repository";
import { pickingCreateSchema, pickingListSchema, pickingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PickingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const pickingService = {
  async list(input: unknown) {
    return pickingRepository.list(pickingListSchema.parse(input));
  },

  async create(input: unknown, context: PickingActionContext) {
    const parsed = pickingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return pickingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PickingActionContext) {
    const current = await pickingRepository.getById(tenantId, id);
    if (!current) throw new Error("Picking record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return pickingRepository.update(tenantId, id, pickingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PickingActionContext) {
    const current = await pickingRepository.getById(tenantId, id);
    if (!current) throw new Error("Picking record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return pickingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await pickingRepository.getById(tenantId, id);
    if (!record) throw new Error("Picking record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

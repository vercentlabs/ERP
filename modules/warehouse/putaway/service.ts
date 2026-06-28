import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { putawayRepository } from "./repository";
import { putawayCreateSchema, putawayListSchema, putawayUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PutawayActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const putawayService = {
  async list(input: unknown) {
    return putawayRepository.list(putawayListSchema.parse(input));
  },

  async create(input: unknown, context: PutawayActionContext) {
    const parsed = putawayCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return putawayRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PutawayActionContext) {
    const current = await putawayRepository.getById(tenantId, id);
    if (!current) throw new Error("Putaway record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return putawayRepository.update(tenantId, id, putawayUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PutawayActionContext) {
    const current = await putawayRepository.getById(tenantId, id);
    if (!current) throw new Error("Putaway record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return putawayRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await putawayRepository.getById(tenantId, id);
    if (!record) throw new Error("Putaway record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

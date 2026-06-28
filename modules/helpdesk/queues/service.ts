import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { queuesRepository } from "./repository";
import { queuesCreateSchema, queuesListSchema, queuesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { QueuesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const queuesService = {
  async list(input: unknown) {
    return queuesRepository.list(queuesListSchema.parse(input));
  },

  async create(input: unknown, context: QueuesActionContext) {
    const parsed = queuesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return queuesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: QueuesActionContext) {
    const current = await queuesRepository.getById(tenantId, id);
    if (!current) throw new Error("Queues record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return queuesRepository.update(tenantId, id, queuesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: QueuesActionContext) {
    const current = await queuesRepository.getById(tenantId, id);
    if (!current) throw new Error("Queues record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return queuesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await queuesRepository.getById(tenantId, id);
    if (!record) throw new Error("Queues record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

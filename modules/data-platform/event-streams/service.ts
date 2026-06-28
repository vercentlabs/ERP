import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { eventStreamsRepository } from "./repository";
import { eventStreamsCreateSchema, eventStreamsListSchema, eventStreamsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { EventStreamsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const eventStreamsService = {
  async list(input: unknown) {
    return eventStreamsRepository.list(eventStreamsListSchema.parse(input));
  },

  async create(input: unknown, context: EventStreamsActionContext) {
    const parsed = eventStreamsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return eventStreamsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: EventStreamsActionContext) {
    const current = await eventStreamsRepository.getById(tenantId, id);
    if (!current) throw new Error("Event Streams record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return eventStreamsRepository.update(tenantId, id, eventStreamsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: EventStreamsActionContext) {
    const current = await eventStreamsRepository.getById(tenantId, id);
    if (!current) throw new Error("Event Streams record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return eventStreamsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await eventStreamsRepository.getById(tenantId, id);
    if (!record) throw new Error("Event Streams record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

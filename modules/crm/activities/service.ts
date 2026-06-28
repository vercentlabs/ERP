import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { activitiesRepository } from "./repository";
import { activitiesCreateSchema, activitiesListSchema, activitiesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ActivitiesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const activitiesService = {
  async list(input: unknown) {
    return activitiesRepository.list(activitiesListSchema.parse(input));
  },

  async create(input: unknown, context: ActivitiesActionContext) {
    const parsed = activitiesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return activitiesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ActivitiesActionContext) {
    const current = await activitiesRepository.getById(tenantId, id);
    if (!current) throw new Error("Activities record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return activitiesRepository.update(tenantId, id, activitiesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ActivitiesActionContext) {
    const current = await activitiesRepository.getById(tenantId, id);
    if (!current) throw new Error("Activities record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return activitiesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await activitiesRepository.getById(tenantId, id);
    if (!record) throw new Error("Activities record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

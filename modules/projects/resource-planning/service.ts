import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { resourcePlanningRepository } from "./repository";
import { resourcePlanningCreateSchema, resourcePlanningListSchema, resourcePlanningUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ResourcePlanningActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const resourcePlanningService = {
  async list(input: unknown) {
    return resourcePlanningRepository.list(resourcePlanningListSchema.parse(input));
  },

  async create(input: unknown, context: ResourcePlanningActionContext) {
    const parsed = resourcePlanningCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return resourcePlanningRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ResourcePlanningActionContext) {
    const current = await resourcePlanningRepository.getById(tenantId, id);
    if (!current) throw new Error("Resource Planning record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return resourcePlanningRepository.update(tenantId, id, resourcePlanningUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ResourcePlanningActionContext) {
    const current = await resourcePlanningRepository.getById(tenantId, id);
    if (!current) throw new Error("Resource Planning record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return resourcePlanningRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await resourcePlanningRepository.getById(tenantId, id);
    if (!record) throw new Error("Resource Planning record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { routePlanningRepository } from "./repository";
import { routePlanningCreateSchema, routePlanningListSchema, routePlanningUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { RoutePlanningActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const routePlanningService = {
  async list(input: unknown) {
    return routePlanningRepository.list(routePlanningListSchema.parse(input));
  },

  async create(input: unknown, context: RoutePlanningActionContext) {
    const parsed = routePlanningCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return routePlanningRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: RoutePlanningActionContext) {
    const current = await routePlanningRepository.getById(tenantId, id);
    if (!current) throw new Error("Route Planning record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return routePlanningRepository.update(tenantId, id, routePlanningUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: RoutePlanningActionContext) {
    const current = await routePlanningRepository.getById(tenantId, id);
    if (!current) throw new Error("Route Planning record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return routePlanningRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await routePlanningRepository.getById(tenantId, id);
    if (!record) throw new Error("Route Planning record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

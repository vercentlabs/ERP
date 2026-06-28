import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { routesRepository } from "./repository";
import { routesCreateSchema, routesListSchema, routesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { RoutesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const routesService = {
  async list(input: unknown) {
    return routesRepository.list(routesListSchema.parse(input));
  },

  async create(input: unknown, context: RoutesActionContext) {
    const parsed = routesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return routesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: RoutesActionContext) {
    const current = await routesRepository.getById(tenantId, id);
    if (!current) throw new Error("Routes record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return routesRepository.update(tenantId, id, routesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: RoutesActionContext) {
    const current = await routesRepository.getById(tenantId, id);
    if (!current) throw new Error("Routes record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return routesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await routesRepository.getById(tenantId, id);
    if (!record) throw new Error("Routes record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

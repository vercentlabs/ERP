import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { routingsRepository } from "./repository";
import { routingsCreateSchema, routingsListSchema, routingsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { RoutingsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const routingsService = {
  async list(input: unknown) {
    return routingsRepository.list(routingsListSchema.parse(input));
  },

  async create(input: unknown, context: RoutingsActionContext) {
    const parsed = routingsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return routingsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: RoutingsActionContext) {
    const current = await routingsRepository.getById(tenantId, id);
    if (!current) throw new Error("Routings record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return routingsRepository.update(tenantId, id, routingsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: RoutingsActionContext) {
    const current = await routingsRepository.getById(tenantId, id);
    if (!current) throw new Error("Routings record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return routingsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await routingsRepository.getById(tenantId, id);
    if (!record) throw new Error("Routings record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

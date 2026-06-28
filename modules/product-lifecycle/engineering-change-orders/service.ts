import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { engineeringChangeOrdersRepository } from "./repository";
import { engineeringChangeOrdersCreateSchema, engineeringChangeOrdersListSchema, engineeringChangeOrdersUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { EngineeringChangeOrdersActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const engineeringChangeOrdersService = {
  async list(input: unknown) {
    return engineeringChangeOrdersRepository.list(engineeringChangeOrdersListSchema.parse(input));
  },

  async create(input: unknown, context: EngineeringChangeOrdersActionContext) {
    const parsed = engineeringChangeOrdersCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return engineeringChangeOrdersRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: EngineeringChangeOrdersActionContext) {
    const current = await engineeringChangeOrdersRepository.getById(tenantId, id);
    if (!current) throw new Error("Engineering Change Orders record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return engineeringChangeOrdersRepository.update(tenantId, id, engineeringChangeOrdersUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: EngineeringChangeOrdersActionContext) {
    const current = await engineeringChangeOrdersRepository.getById(tenantId, id);
    if (!current) throw new Error("Engineering Change Orders record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return engineeringChangeOrdersRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await engineeringChangeOrdersRepository.getById(tenantId, id);
    if (!record) throw new Error("Engineering Change Orders record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

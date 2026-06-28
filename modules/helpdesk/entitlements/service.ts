import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { entitlementsRepository } from "./repository";
import { entitlementsCreateSchema, entitlementsListSchema, entitlementsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { EntitlementsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const entitlementsService = {
  async list(input: unknown) {
    return entitlementsRepository.list(entitlementsListSchema.parse(input));
  },

  async create(input: unknown, context: EntitlementsActionContext) {
    const parsed = entitlementsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return entitlementsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: EntitlementsActionContext) {
    const current = await entitlementsRepository.getById(tenantId, id);
    if (!current) throw new Error("Entitlements record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return entitlementsRepository.update(tenantId, id, entitlementsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: EntitlementsActionContext) {
    const current = await entitlementsRepository.getById(tenantId, id);
    if (!current) throw new Error("Entitlements record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return entitlementsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await entitlementsRepository.getById(tenantId, id);
    if (!record) throw new Error("Entitlements record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

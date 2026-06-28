import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { discountsRepository } from "./repository";
import { discountsCreateSchema, discountsListSchema, discountsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DiscountsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const discountsService = {
  async list(input: unknown) {
    return discountsRepository.list(discountsListSchema.parse(input));
  },

  async create(input: unknown, context: DiscountsActionContext) {
    const parsed = discountsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return discountsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DiscountsActionContext) {
    const current = await discountsRepository.getById(tenantId, id);
    if (!current) throw new Error("Discounts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return discountsRepository.update(tenantId, id, discountsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DiscountsActionContext) {
    const current = await discountsRepository.getById(tenantId, id);
    if (!current) throw new Error("Discounts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return discountsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await discountsRepository.getById(tenantId, id);
    if (!record) throw new Error("Discounts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

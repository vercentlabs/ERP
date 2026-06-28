import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { checkoutRepository } from "./repository";
import { checkoutCreateSchema, checkoutListSchema, checkoutUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CheckoutActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const checkoutService = {
  async list(input: unknown) {
    return checkoutRepository.list(checkoutListSchema.parse(input));
  },

  async create(input: unknown, context: CheckoutActionContext) {
    const parsed = checkoutCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return checkoutRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CheckoutActionContext) {
    const current = await checkoutRepository.getById(tenantId, id);
    if (!current) throw new Error("Checkout record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return checkoutRepository.update(tenantId, id, checkoutUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CheckoutActionContext) {
    const current = await checkoutRepository.getById(tenantId, id);
    if (!current) throw new Error("Checkout record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return checkoutRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await checkoutRepository.getById(tenantId, id);
    if (!record) throw new Error("Checkout record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

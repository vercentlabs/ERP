import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { shippingRepository } from "./repository";
import { shippingCreateSchema, shippingListSchema, shippingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ShippingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const shippingService = {
  async list(input: unknown) {
    return shippingRepository.list(shippingListSchema.parse(input));
  },

  async create(input: unknown, context: ShippingActionContext) {
    const parsed = shippingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return shippingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ShippingActionContext) {
    const current = await shippingRepository.getById(tenantId, id);
    if (!current) throw new Error("Shipping record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return shippingRepository.update(tenantId, id, shippingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ShippingActionContext) {
    const current = await shippingRepository.getById(tenantId, id);
    if (!current) throw new Error("Shipping record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return shippingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await shippingRepository.getById(tenantId, id);
    if (!record) throw new Error("Shipping record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

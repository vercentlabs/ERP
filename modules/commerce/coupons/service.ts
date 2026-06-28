import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { couponsRepository } from "./repository";
import { couponsCreateSchema, couponsListSchema, couponsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CouponsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const couponsService = {
  async list(input: unknown) {
    return couponsRepository.list(couponsListSchema.parse(input));
  },

  async create(input: unknown, context: CouponsActionContext) {
    const parsed = couponsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return couponsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CouponsActionContext) {
    const current = await couponsRepository.getById(tenantId, id);
    if (!current) throw new Error("Coupons record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return couponsRepository.update(tenantId, id, couponsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CouponsActionContext) {
    const current = await couponsRepository.getById(tenantId, id);
    if (!current) throw new Error("Coupons record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return couponsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await couponsRepository.getById(tenantId, id);
    if (!record) throw new Error("Coupons record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { promotionsRepository } from "./repository";
import { promotionsCreateSchema, promotionsListSchema, promotionsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PromotionsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const promotionsService = {
  async list(input: unknown) {
    return promotionsRepository.list(promotionsListSchema.parse(input));
  },

  async create(input: unknown, context: PromotionsActionContext) {
    const parsed = promotionsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return promotionsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PromotionsActionContext) {
    const current = await promotionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Promotions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return promotionsRepository.update(tenantId, id, promotionsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PromotionsActionContext) {
    const current = await promotionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Promotions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return promotionsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await promotionsRepository.getById(tenantId, id);
    if (!record) throw new Error("Promotions record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

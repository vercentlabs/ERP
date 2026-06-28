import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { goodsReceiptsRepository } from "./repository";
import { goodsReceiptsCreateSchema, goodsReceiptsListSchema, goodsReceiptsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { GoodsReceiptsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const goodsReceiptsService = {
  async list(input: unknown) {
    return goodsReceiptsRepository.list(goodsReceiptsListSchema.parse(input));
  },

  async create(input: unknown, context: GoodsReceiptsActionContext) {
    const parsed = goodsReceiptsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return goodsReceiptsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: GoodsReceiptsActionContext) {
    const current = await goodsReceiptsRepository.getById(tenantId, id);
    if (!current) throw new Error("Goods Receipts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return goodsReceiptsRepository.update(tenantId, id, goodsReceiptsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: GoodsReceiptsActionContext) {
    const current = await goodsReceiptsRepository.getById(tenantId, id);
    if (!current) throw new Error("Goods Receipts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return goodsReceiptsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await goodsReceiptsRepository.getById(tenantId, id);
    if (!record) throw new Error("Goods Receipts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { stockAdjustmentsRepository } from "./repository";
import { stockAdjustmentsCreateSchema, stockAdjustmentsListSchema, stockAdjustmentsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { StockAdjustmentsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const stockAdjustmentsService = {
  async list(input: unknown) {
    return stockAdjustmentsRepository.list(stockAdjustmentsListSchema.parse(input));
  },

  async create(input: unknown, context: StockAdjustmentsActionContext) {
    const parsed = stockAdjustmentsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return stockAdjustmentsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: StockAdjustmentsActionContext) {
    const current = await stockAdjustmentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Stock Adjustments record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return stockAdjustmentsRepository.update(tenantId, id, stockAdjustmentsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: StockAdjustmentsActionContext) {
    const current = await stockAdjustmentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Stock Adjustments record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return stockAdjustmentsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await stockAdjustmentsRepository.getById(tenantId, id);
    if (!record) throw new Error("Stock Adjustments record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

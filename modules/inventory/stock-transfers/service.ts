import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { stockTransfersRepository } from "./repository";
import { stockTransfersCreateSchema, stockTransfersListSchema, stockTransfersUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { StockTransfersActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const stockTransfersService = {
  async list(input: unknown) {
    return stockTransfersRepository.list(stockTransfersListSchema.parse(input));
  },

  async create(input: unknown, context: StockTransfersActionContext) {
    const parsed = stockTransfersCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return stockTransfersRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: StockTransfersActionContext) {
    const current = await stockTransfersRepository.getById(tenantId, id);
    if (!current) throw new Error("Stock Transfers record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return stockTransfersRepository.update(tenantId, id, stockTransfersUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: StockTransfersActionContext) {
    const current = await stockTransfersRepository.getById(tenantId, id);
    if (!current) throw new Error("Stock Transfers record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return stockTransfersRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await stockTransfersRepository.getById(tenantId, id);
    if (!record) throw new Error("Stock Transfers record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

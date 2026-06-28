import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { stockBalancesRepository } from "./repository";
import { stockBalancesCreateSchema, stockBalancesListSchema, stockBalancesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { StockBalancesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const stockBalancesService = {
  async list(input: unknown) {
    return stockBalancesRepository.list(stockBalancesListSchema.parse(input));
  },

  async create(input: unknown, context: StockBalancesActionContext) {
    const parsed = stockBalancesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return stockBalancesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: StockBalancesActionContext) {
    const current = await stockBalancesRepository.getById(tenantId, id);
    if (!current) throw new Error("Stock Balances record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return stockBalancesRepository.update(tenantId, id, stockBalancesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: StockBalancesActionContext) {
    const current = await stockBalancesRepository.getById(tenantId, id);
    if (!current) throw new Error("Stock Balances record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return stockBalancesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await stockBalancesRepository.getById(tenantId, id);
    if (!record) throw new Error("Stock Balances record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

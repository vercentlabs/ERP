import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { cashFlowRepository } from "./repository";
import { cashFlowCreateSchema, cashFlowListSchema, cashFlowUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CashFlowActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const cashFlowService = {
  async list(input: unknown) {
    return cashFlowRepository.list(cashFlowListSchema.parse(input));
  },

  async create(input: unknown, context: CashFlowActionContext) {
    const parsed = cashFlowCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return cashFlowRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CashFlowActionContext) {
    const current = await cashFlowRepository.getById(tenantId, id);
    if (!current) throw new Error("Cash Flow record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return cashFlowRepository.update(tenantId, id, cashFlowUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CashFlowActionContext) {
    const current = await cashFlowRepository.getById(tenantId, id);
    if (!current) throw new Error("Cash Flow record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return cashFlowRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await cashFlowRepository.getById(tenantId, id);
    if (!record) throw new Error("Cash Flow record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

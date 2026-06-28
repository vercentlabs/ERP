import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { budgetsRepository } from "./repository";
import { budgetsCreateSchema, budgetsListSchema, budgetsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { BudgetsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const budgetsService = {
  async list(input: unknown) {
    return budgetsRepository.list(budgetsListSchema.parse(input));
  },

  async create(input: unknown, context: BudgetsActionContext) {
    const parsed = budgetsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return budgetsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: BudgetsActionContext) {
    const current = await budgetsRepository.getById(tenantId, id);
    if (!current) throw new Error("Budgets record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return budgetsRepository.update(tenantId, id, budgetsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: BudgetsActionContext) {
    const current = await budgetsRepository.getById(tenantId, id);
    if (!current) throw new Error("Budgets record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return budgetsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await budgetsRepository.getById(tenantId, id);
    if (!record) throw new Error("Budgets record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

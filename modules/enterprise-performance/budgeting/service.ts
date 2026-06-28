import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { budgetingRepository } from "./repository";
import { budgetingCreateSchema, budgetingListSchema, budgetingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { BudgetingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const budgetingService = {
  async list(input: unknown) {
    return budgetingRepository.list(budgetingListSchema.parse(input));
  },

  async create(input: unknown, context: BudgetingActionContext) {
    const parsed = budgetingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return budgetingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: BudgetingActionContext) {
    const current = await budgetingRepository.getById(tenantId, id);
    if (!current) throw new Error("Budgeting record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return budgetingRepository.update(tenantId, id, budgetingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: BudgetingActionContext) {
    const current = await budgetingRepository.getById(tenantId, id);
    if (!current) throw new Error("Budgeting record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return budgetingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await budgetingRepository.getById(tenantId, id);
    if (!record) throw new Error("Budgeting record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { expensesRepository } from "./repository";
import { expensesCreateSchema, expensesListSchema, expensesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ExpensesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const expensesService = {
  async list(input: unknown) {
    return expensesRepository.list(expensesListSchema.parse(input));
  },

  async create(input: unknown, context: ExpensesActionContext) {
    const parsed = expensesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return expensesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ExpensesActionContext) {
    const current = await expensesRepository.getById(tenantId, id);
    if (!current) throw new Error("Expenses record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return expensesRepository.update(tenantId, id, expensesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ExpensesActionContext) {
    const current = await expensesRepository.getById(tenantId, id);
    if (!current) throw new Error("Expenses record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return expensesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await expensesRepository.getById(tenantId, id);
    if (!record) throw new Error("Expenses record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

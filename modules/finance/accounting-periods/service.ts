import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { accountingPeriodsRepository } from "./repository";
import { accountingPeriodsCreateSchema, accountingPeriodsListSchema, accountingPeriodsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { AccountingPeriodsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const accountingPeriodsService = {
  async list(input: unknown) {
    return accountingPeriodsRepository.list(accountingPeriodsListSchema.parse(input));
  },

  async create(input: unknown, context: AccountingPeriodsActionContext) {
    const parsed = accountingPeriodsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return accountingPeriodsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: AccountingPeriodsActionContext) {
    const current = await accountingPeriodsRepository.getById(tenantId, id);
    if (!current) throw new Error("Accounting Periods record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return accountingPeriodsRepository.update(tenantId, id, accountingPeriodsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: AccountingPeriodsActionContext) {
    const current = await accountingPeriodsRepository.getById(tenantId, id);
    if (!current) throw new Error("Accounting Periods record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return accountingPeriodsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await accountingPeriodsRepository.getById(tenantId, id);
    if (!record) throw new Error("Accounting Periods record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { accountsPayableRepository } from "./repository";
import { accountsPayableCreateSchema, accountsPayableListSchema, accountsPayableUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { AccountsPayableActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const accountsPayableService = {
  async list(input: unknown) {
    return accountsPayableRepository.list(accountsPayableListSchema.parse(input));
  },

  async create(input: unknown, context: AccountsPayableActionContext) {
    const parsed = accountsPayableCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return accountsPayableRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: AccountsPayableActionContext) {
    const current = await accountsPayableRepository.getById(tenantId, id);
    if (!current) throw new Error("Accounts Payable record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return accountsPayableRepository.update(tenantId, id, accountsPayableUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: AccountsPayableActionContext) {
    const current = await accountsPayableRepository.getById(tenantId, id);
    if (!current) throw new Error("Accounts Payable record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return accountsPayableRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await accountsPayableRepository.getById(tenantId, id);
    if (!record) throw new Error("Accounts Payable record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

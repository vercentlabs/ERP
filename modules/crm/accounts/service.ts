import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { accountsRepository } from "./repository";
import { accountsCreateSchema, accountsListSchema, accountsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { AccountsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const accountsService = {
  async list(input: unknown) {
    return accountsRepository.list(accountsListSchema.parse(input));
  },

  async create(input: unknown, context: AccountsActionContext) {
    const parsed = accountsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return accountsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: AccountsActionContext) {
    const current = await accountsRepository.getById(tenantId, id);
    if (!current) throw new Error("Accounts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return accountsRepository.update(tenantId, id, accountsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: AccountsActionContext) {
    const current = await accountsRepository.getById(tenantId, id);
    if (!current) throw new Error("Accounts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return accountsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await accountsRepository.getById(tenantId, id);
    if (!record) throw new Error("Accounts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

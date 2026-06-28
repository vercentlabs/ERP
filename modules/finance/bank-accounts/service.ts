import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { bankAccountsRepository } from "./repository";
import { bankAccountsCreateSchema, bankAccountsListSchema, bankAccountsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { BankAccountsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const bankAccountsService = {
  async list(input: unknown) {
    return bankAccountsRepository.list(bankAccountsListSchema.parse(input));
  },

  async create(input: unknown, context: BankAccountsActionContext) {
    const parsed = bankAccountsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return bankAccountsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: BankAccountsActionContext) {
    const current = await bankAccountsRepository.getById(tenantId, id);
    if (!current) throw new Error("Bank Accounts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return bankAccountsRepository.update(tenantId, id, bankAccountsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: BankAccountsActionContext) {
    const current = await bankAccountsRepository.getById(tenantId, id);
    if (!current) throw new Error("Bank Accounts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return bankAccountsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await bankAccountsRepository.getById(tenantId, id);
    if (!record) throw new Error("Bank Accounts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

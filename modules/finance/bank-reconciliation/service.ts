import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { bankReconciliationRepository } from "./repository";
import { bankReconciliationCreateSchema, bankReconciliationListSchema, bankReconciliationUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { BankReconciliationActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const bankReconciliationService = {
  async list(input: unknown) {
    return bankReconciliationRepository.list(bankReconciliationListSchema.parse(input));
  },

  async create(input: unknown, context: BankReconciliationActionContext) {
    const parsed = bankReconciliationCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return bankReconciliationRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: BankReconciliationActionContext) {
    const current = await bankReconciliationRepository.getById(tenantId, id);
    if (!current) throw new Error("Bank Reconciliation record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return bankReconciliationRepository.update(tenantId, id, bankReconciliationUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: BankReconciliationActionContext) {
    const current = await bankReconciliationRepository.getById(tenantId, id);
    if (!current) throw new Error("Bank Reconciliation record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return bankReconciliationRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await bankReconciliationRepository.getById(tenantId, id);
    if (!record) throw new Error("Bank Reconciliation record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

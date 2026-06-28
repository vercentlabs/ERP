import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { generalLedgerRepository } from "./repository";
import { generalLedgerCreateSchema, generalLedgerListSchema, generalLedgerUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { GeneralLedgerActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const generalLedgerService = {
  async list(input: unknown) {
    return generalLedgerRepository.list(generalLedgerListSchema.parse(input));
  },

  async create(input: unknown, context: GeneralLedgerActionContext) {
    const parsed = generalLedgerCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return generalLedgerRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: GeneralLedgerActionContext) {
    const current = await generalLedgerRepository.getById(tenantId, id);
    if (!current) throw new Error("General Ledger record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return generalLedgerRepository.update(tenantId, id, generalLedgerUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: GeneralLedgerActionContext) {
    const current = await generalLedgerRepository.getById(tenantId, id);
    if (!current) throw new Error("General Ledger record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return generalLedgerRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await generalLedgerRepository.getById(tenantId, id);
    if (!record) throw new Error("General Ledger record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

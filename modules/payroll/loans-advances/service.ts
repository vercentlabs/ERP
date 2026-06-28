import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { loansAdvancesRepository } from "./repository";
import { loansAdvancesCreateSchema, loansAdvancesListSchema, loansAdvancesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { LoansAdvancesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const loansAdvancesService = {
  async list(input: unknown) {
    return loansAdvancesRepository.list(loansAdvancesListSchema.parse(input));
  },

  async create(input: unknown, context: LoansAdvancesActionContext) {
    const parsed = loansAdvancesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return loansAdvancesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: LoansAdvancesActionContext) {
    const current = await loansAdvancesRepository.getById(tenantId, id);
    if (!current) throw new Error("Loans Advances record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return loansAdvancesRepository.update(tenantId, id, loansAdvancesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: LoansAdvancesActionContext) {
    const current = await loansAdvancesRepository.getById(tenantId, id);
    if (!current) throw new Error("Loans Advances record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return loansAdvancesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await loansAdvancesRepository.getById(tenantId, id);
    if (!record) throw new Error("Loans Advances record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

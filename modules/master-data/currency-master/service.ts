import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { currencyMasterRepository } from "./repository";
import { currencyMasterCreateSchema, currencyMasterListSchema, currencyMasterUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CurrencyMasterActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const currencyMasterService = {
  async list(input: unknown) {
    return currencyMasterRepository.list(currencyMasterListSchema.parse(input));
  },

  async create(input: unknown, context: CurrencyMasterActionContext) {
    const parsed = currencyMasterCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return currencyMasterRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CurrencyMasterActionContext) {
    const current = await currencyMasterRepository.getById(tenantId, id);
    if (!current) throw new Error("Currency Master record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return currencyMasterRepository.update(tenantId, id, currencyMasterUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CurrencyMasterActionContext) {
    const current = await currencyMasterRepository.getById(tenantId, id);
    if (!current) throw new Error("Currency Master record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return currencyMasterRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await currencyMasterRepository.getById(tenantId, id);
    if (!record) throw new Error("Currency Master record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

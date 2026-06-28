import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { currenciesRepository } from "./repository";
import { currenciesCreateSchema, currenciesListSchema, currenciesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CurrenciesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const currenciesService = {
  async list(input: unknown) {
    return currenciesRepository.list(currenciesListSchema.parse(input));
  },

  async create(input: unknown, context: CurrenciesActionContext) {
    const parsed = currenciesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return currenciesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CurrenciesActionContext) {
    const current = await currenciesRepository.getById(tenantId, id);
    if (!current) throw new Error("Currencies record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return currenciesRepository.update(tenantId, id, currenciesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CurrenciesActionContext) {
    const current = await currenciesRepository.getById(tenantId, id);
    if (!current) throw new Error("Currencies record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return currenciesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await currenciesRepository.getById(tenantId, id);
    if (!record) throw new Error("Currencies record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

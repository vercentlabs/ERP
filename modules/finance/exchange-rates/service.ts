import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { exchangeRatesRepository } from "./repository";
import { exchangeRatesCreateSchema, exchangeRatesListSchema, exchangeRatesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ExchangeRatesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const exchangeRatesService = {
  async list(input: unknown) {
    return exchangeRatesRepository.list(exchangeRatesListSchema.parse(input));
  },

  async create(input: unknown, context: ExchangeRatesActionContext) {
    const parsed = exchangeRatesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return exchangeRatesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ExchangeRatesActionContext) {
    const current = await exchangeRatesRepository.getById(tenantId, id);
    if (!current) throw new Error("Exchange Rates record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return exchangeRatesRepository.update(tenantId, id, exchangeRatesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ExchangeRatesActionContext) {
    const current = await exchangeRatesRepository.getById(tenantId, id);
    if (!current) throw new Error("Exchange Rates record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return exchangeRatesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await exchangeRatesRepository.getById(tenantId, id);
    if (!record) throw new Error("Exchange Rates record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

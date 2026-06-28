import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { freightRatesRepository } from "./repository";
import { freightRatesCreateSchema, freightRatesListSchema, freightRatesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { FreightRatesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const freightRatesService = {
  async list(input: unknown) {
    return freightRatesRepository.list(freightRatesListSchema.parse(input));
  },

  async create(input: unknown, context: FreightRatesActionContext) {
    const parsed = freightRatesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return freightRatesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: FreightRatesActionContext) {
    const current = await freightRatesRepository.getById(tenantId, id);
    if (!current) throw new Error("Freight Rates record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return freightRatesRepository.update(tenantId, id, freightRatesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: FreightRatesActionContext) {
    const current = await freightRatesRepository.getById(tenantId, id);
    if (!current) throw new Error("Freight Rates record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return freightRatesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await freightRatesRepository.getById(tenantId, id);
    if (!record) throw new Error("Freight Rates record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { valuationRepository } from "./repository";
import { valuationCreateSchema, valuationListSchema, valuationUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ValuationActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const valuationService = {
  async list(input: unknown) {
    return valuationRepository.list(valuationListSchema.parse(input));
  },

  async create(input: unknown, context: ValuationActionContext) {
    const parsed = valuationCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return valuationRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ValuationActionContext) {
    const current = await valuationRepository.getById(tenantId, id);
    if (!current) throw new Error("Valuation record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return valuationRepository.update(tenantId, id, valuationUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ValuationActionContext) {
    const current = await valuationRepository.getById(tenantId, id);
    if (!current) throw new Error("Valuation record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return valuationRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await valuationRepository.getById(tenantId, id);
    if (!record) throw new Error("Valuation record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

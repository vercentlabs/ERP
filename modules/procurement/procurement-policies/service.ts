import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { procurementPoliciesRepository } from "./repository";
import { procurementPoliciesCreateSchema, procurementPoliciesListSchema, procurementPoliciesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProcurementPoliciesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const procurementPoliciesService = {
  async list(input: unknown) {
    return procurementPoliciesRepository.list(procurementPoliciesListSchema.parse(input));
  },

  async create(input: unknown, context: ProcurementPoliciesActionContext) {
    const parsed = procurementPoliciesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return procurementPoliciesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProcurementPoliciesActionContext) {
    const current = await procurementPoliciesRepository.getById(tenantId, id);
    if (!current) throw new Error("Procurement Policies record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return procurementPoliciesRepository.update(tenantId, id, procurementPoliciesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProcurementPoliciesActionContext) {
    const current = await procurementPoliciesRepository.getById(tenantId, id);
    if (!current) throw new Error("Procurement Policies record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return procurementPoliciesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await procurementPoliciesRepository.getById(tenantId, id);
    if (!record) throw new Error("Procurement Policies record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

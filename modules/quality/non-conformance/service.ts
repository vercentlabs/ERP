import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { nonConformanceRepository } from "./repository";
import { nonConformanceCreateSchema, nonConformanceListSchema, nonConformanceUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { NonConformanceActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const nonConformanceService = {
  async list(input: unknown) {
    return nonConformanceRepository.list(nonConformanceListSchema.parse(input));
  },

  async create(input: unknown, context: NonConformanceActionContext) {
    const parsed = nonConformanceCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return nonConformanceRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: NonConformanceActionContext) {
    const current = await nonConformanceRepository.getById(tenantId, id);
    if (!current) throw new Error("Non Conformance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return nonConformanceRepository.update(tenantId, id, nonConformanceUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: NonConformanceActionContext) {
    const current = await nonConformanceRepository.getById(tenantId, id);
    if (!current) throw new Error("Non Conformance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return nonConformanceRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await nonConformanceRepository.getById(tenantId, id);
    if (!record) throw new Error("Non Conformance record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

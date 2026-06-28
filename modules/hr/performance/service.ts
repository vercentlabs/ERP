import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { performanceRepository } from "./repository";
import { performanceCreateSchema, performanceListSchema, performanceUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PerformanceActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const performanceService = {
  async list(input: unknown) {
    return performanceRepository.list(performanceListSchema.parse(input));
  },

  async create(input: unknown, context: PerformanceActionContext) {
    const parsed = performanceCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return performanceRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PerformanceActionContext) {
    const current = await performanceRepository.getById(tenantId, id);
    if (!current) throw new Error("Performance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return performanceRepository.update(tenantId, id, performanceUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PerformanceActionContext) {
    const current = await performanceRepository.getById(tenantId, id);
    if (!current) throw new Error("Performance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return performanceRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await performanceRepository.getById(tenantId, id);
    if (!record) throw new Error("Performance record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

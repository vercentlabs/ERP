import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { capacityPlanningRepository } from "./repository";
import { capacityPlanningCreateSchema, capacityPlanningListSchema, capacityPlanningUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CapacityPlanningActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const capacityPlanningService = {
  async list(input: unknown) {
    return capacityPlanningRepository.list(capacityPlanningListSchema.parse(input));
  },

  async create(input: unknown, context: CapacityPlanningActionContext) {
    const parsed = capacityPlanningCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return capacityPlanningRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CapacityPlanningActionContext) {
    const current = await capacityPlanningRepository.getById(tenantId, id);
    if (!current) throw new Error("Capacity Planning record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return capacityPlanningRepository.update(tenantId, id, capacityPlanningUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CapacityPlanningActionContext) {
    const current = await capacityPlanningRepository.getById(tenantId, id);
    if (!current) throw new Error("Capacity Planning record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return capacityPlanningRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await capacityPlanningRepository.getById(tenantId, id);
    if (!record) throw new Error("Capacity Planning record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

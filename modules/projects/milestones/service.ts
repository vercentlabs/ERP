import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { milestonesRepository } from "./repository";
import { milestonesCreateSchema, milestonesListSchema, milestonesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { MilestonesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const milestonesService = {
  async list(input: unknown) {
    return milestonesRepository.list(milestonesListSchema.parse(input));
  },

  async create(input: unknown, context: MilestonesActionContext) {
    const parsed = milestonesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return milestonesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: MilestonesActionContext) {
    const current = await milestonesRepository.getById(tenantId, id);
    if (!current) throw new Error("Milestones record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return milestonesRepository.update(tenantId, id, milestonesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: MilestonesActionContext) {
    const current = await milestonesRepository.getById(tenantId, id);
    if (!current) throw new Error("Milestones record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return milestonesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await milestonesRepository.getById(tenantId, id);
    if (!record) throw new Error("Milestones record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

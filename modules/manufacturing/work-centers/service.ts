import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { workCentersRepository } from "./repository";
import { workCentersCreateSchema, workCentersListSchema, workCentersUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { WorkCentersActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const workCentersService = {
  async list(input: unknown) {
    return workCentersRepository.list(workCentersListSchema.parse(input));
  },

  async create(input: unknown, context: WorkCentersActionContext) {
    const parsed = workCentersCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return workCentersRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: WorkCentersActionContext) {
    const current = await workCentersRepository.getById(tenantId, id);
    if (!current) throw new Error("Work Centers record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return workCentersRepository.update(tenantId, id, workCentersUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: WorkCentersActionContext) {
    const current = await workCentersRepository.getById(tenantId, id);
    if (!current) throw new Error("Work Centers record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return workCentersRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await workCentersRepository.getById(tenantId, id);
    if (!record) throw new Error("Work Centers record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { leaveRepository } from "./repository";
import { leaveCreateSchema, leaveListSchema, leaveUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { LeaveActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const leaveService = {
  async list(input: unknown) {
    return leaveRepository.list(leaveListSchema.parse(input));
  },

  async create(input: unknown, context: LeaveActionContext) {
    const parsed = leaveCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return leaveRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: LeaveActionContext) {
    const current = await leaveRepository.getById(tenantId, id);
    if (!current) throw new Error("Leave record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return leaveRepository.update(tenantId, id, leaveUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: LeaveActionContext) {
    const current = await leaveRepository.getById(tenantId, id);
    if (!current) throw new Error("Leave record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return leaveRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await leaveRepository.getById(tenantId, id);
    if (!record) throw new Error("Leave record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

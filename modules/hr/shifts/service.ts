import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { shiftsRepository } from "./repository";
import { shiftsCreateSchema, shiftsListSchema, shiftsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ShiftsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const shiftsService = {
  async list(input: unknown) {
    return shiftsRepository.list(shiftsListSchema.parse(input));
  },

  async create(input: unknown, context: ShiftsActionContext) {
    const parsed = shiftsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return shiftsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ShiftsActionContext) {
    const current = await shiftsRepository.getById(tenantId, id);
    if (!current) throw new Error("Shifts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return shiftsRepository.update(tenantId, id, shiftsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ShiftsActionContext) {
    const current = await shiftsRepository.getById(tenantId, id);
    if (!current) throw new Error("Shifts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return shiftsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await shiftsRepository.getById(tenantId, id);
    if (!record) throw new Error("Shifts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

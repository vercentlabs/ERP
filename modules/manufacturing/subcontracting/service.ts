import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { subcontractingRepository } from "./repository";
import { subcontractingCreateSchema, subcontractingListSchema, subcontractingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SubcontractingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const subcontractingService = {
  async list(input: unknown) {
    return subcontractingRepository.list(subcontractingListSchema.parse(input));
  },

  async create(input: unknown, context: SubcontractingActionContext) {
    const parsed = subcontractingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return subcontractingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SubcontractingActionContext) {
    const current = await subcontractingRepository.getById(tenantId, id);
    if (!current) throw new Error("Subcontracting record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return subcontractingRepository.update(tenantId, id, subcontractingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SubcontractingActionContext) {
    const current = await subcontractingRepository.getById(tenantId, id);
    if (!current) throw new Error("Subcontracting record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return subcontractingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await subcontractingRepository.getById(tenantId, id);
    if (!record) throw new Error("Subcontracting record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

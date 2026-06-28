import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { correctiveActionsRepository } from "./repository";
import { correctiveActionsCreateSchema, correctiveActionsListSchema, correctiveActionsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CorrectiveActionsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const correctiveActionsService = {
  async list(input: unknown) {
    return correctiveActionsRepository.list(correctiveActionsListSchema.parse(input));
  },

  async create(input: unknown, context: CorrectiveActionsActionContext) {
    const parsed = correctiveActionsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return correctiveActionsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CorrectiveActionsActionContext) {
    const current = await correctiveActionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Corrective Actions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return correctiveActionsRepository.update(tenantId, id, correctiveActionsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CorrectiveActionsActionContext) {
    const current = await correctiveActionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Corrective Actions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return correctiveActionsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await correctiveActionsRepository.getById(tenantId, id);
    if (!record) throw new Error("Corrective Actions record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

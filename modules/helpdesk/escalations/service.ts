import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { escalationsRepository } from "./repository";
import { escalationsCreateSchema, escalationsListSchema, escalationsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { EscalationsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const escalationsService = {
  async list(input: unknown) {
    return escalationsRepository.list(escalationsListSchema.parse(input));
  },

  async create(input: unknown, context: EscalationsActionContext) {
    const parsed = escalationsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return escalationsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: EscalationsActionContext) {
    const current = await escalationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Escalations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return escalationsRepository.update(tenantId, id, escalationsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: EscalationsActionContext) {
    const current = await escalationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Escalations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return escalationsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await escalationsRepository.getById(tenantId, id);
    if (!record) throw new Error("Escalations record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

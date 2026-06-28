import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { periodCloseRepository } from "./repository";
import { periodCloseCreateSchema, periodCloseListSchema, periodCloseUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PeriodCloseActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const periodCloseService = {
  async list(input: unknown) {
    return periodCloseRepository.list(periodCloseListSchema.parse(input));
  },

  async create(input: unknown, context: PeriodCloseActionContext) {
    const parsed = periodCloseCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return periodCloseRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PeriodCloseActionContext) {
    const current = await periodCloseRepository.getById(tenantId, id);
    if (!current) throw new Error("Period Close record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return periodCloseRepository.update(tenantId, id, periodCloseUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PeriodCloseActionContext) {
    const current = await periodCloseRepository.getById(tenantId, id);
    if (!current) throw new Error("Period Close record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return periodCloseRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await periodCloseRepository.getById(tenantId, id);
    if (!record) throw new Error("Period Close record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

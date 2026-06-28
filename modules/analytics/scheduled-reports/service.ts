import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { scheduledReportsRepository } from "./repository";
import { scheduledReportsCreateSchema, scheduledReportsListSchema, scheduledReportsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ScheduledReportsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const scheduledReportsService = {
  async list(input: unknown) {
    return scheduledReportsRepository.list(scheduledReportsListSchema.parse(input));
  },

  async create(input: unknown, context: ScheduledReportsActionContext) {
    const parsed = scheduledReportsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return scheduledReportsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ScheduledReportsActionContext) {
    const current = await scheduledReportsRepository.getById(tenantId, id);
    if (!current) throw new Error("Scheduled Reports record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return scheduledReportsRepository.update(tenantId, id, scheduledReportsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ScheduledReportsActionContext) {
    const current = await scheduledReportsRepository.getById(tenantId, id);
    if (!current) throw new Error("Scheduled Reports record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return scheduledReportsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await scheduledReportsRepository.getById(tenantId, id);
    if (!record) throw new Error("Scheduled Reports record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

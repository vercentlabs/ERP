import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { notificationsRepository } from "./repository";
import { notificationsCreateSchema, notificationsListSchema, notificationsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { NotificationsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const notificationsService = {
  async list(input: unknown) {
    return notificationsRepository.list(notificationsListSchema.parse(input));
  },

  async create(input: unknown, context: NotificationsActionContext) {
    const parsed = notificationsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return notificationsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: NotificationsActionContext) {
    const current = await notificationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Notifications record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return notificationsRepository.update(tenantId, id, notificationsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: NotificationsActionContext) {
    const current = await notificationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Notifications record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return notificationsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await notificationsRepository.getById(tenantId, id);
    if (!record) throw new Error("Notifications record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

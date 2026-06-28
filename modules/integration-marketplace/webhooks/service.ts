import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { webhooksRepository } from "./repository";
import { webhooksCreateSchema, webhooksListSchema, webhooksUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { WebhooksActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const webhooksService = {
  async list(input: unknown) {
    return webhooksRepository.list(webhooksListSchema.parse(input));
  },

  async create(input: unknown, context: WebhooksActionContext) {
    const parsed = webhooksCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return webhooksRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: WebhooksActionContext) {
    const current = await webhooksRepository.getById(tenantId, id);
    if (!current) throw new Error("Webhooks record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return webhooksRepository.update(tenantId, id, webhooksUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: WebhooksActionContext) {
    const current = await webhooksRepository.getById(tenantId, id);
    if (!current) throw new Error("Webhooks record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return webhooksRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await webhooksRepository.getById(tenantId, id);
    if (!record) throw new Error("Webhooks record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

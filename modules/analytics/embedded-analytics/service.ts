import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { embeddedAnalyticsRepository } from "./repository";
import { embeddedAnalyticsCreateSchema, embeddedAnalyticsListSchema, embeddedAnalyticsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { EmbeddedAnalyticsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const embeddedAnalyticsService = {
  async list(input: unknown) {
    return embeddedAnalyticsRepository.list(embeddedAnalyticsListSchema.parse(input));
  },

  async create(input: unknown, context: EmbeddedAnalyticsActionContext) {
    const parsed = embeddedAnalyticsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return embeddedAnalyticsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: EmbeddedAnalyticsActionContext) {
    const current = await embeddedAnalyticsRepository.getById(tenantId, id);
    if (!current) throw new Error("Embedded Analytics record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return embeddedAnalyticsRepository.update(tenantId, id, embeddedAnalyticsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: EmbeddedAnalyticsActionContext) {
    const current = await embeddedAnalyticsRepository.getById(tenantId, id);
    if (!current) throw new Error("Embedded Analytics record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return embeddedAnalyticsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await embeddedAnalyticsRepository.getById(tenantId, id);
    if (!record) throw new Error("Embedded Analytics record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

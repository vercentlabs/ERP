import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { metricsLayerRepository } from "./repository";
import { metricsLayerCreateSchema, metricsLayerListSchema, metricsLayerUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { MetricsLayerActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const metricsLayerService = {
  async list(input: unknown) {
    return metricsLayerRepository.list(metricsLayerListSchema.parse(input));
  },

  async create(input: unknown, context: MetricsLayerActionContext) {
    const parsed = metricsLayerCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return metricsLayerRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: MetricsLayerActionContext) {
    const current = await metricsLayerRepository.getById(tenantId, id);
    if (!current) throw new Error("Metrics Layer record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return metricsLayerRepository.update(tenantId, id, metricsLayerUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: MetricsLayerActionContext) {
    const current = await metricsLayerRepository.getById(tenantId, id);
    if (!current) throw new Error("Metrics Layer record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return metricsLayerRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await metricsLayerRepository.getById(tenantId, id);
    if (!record) throw new Error("Metrics Layer record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { serviceAnalyticsRepository } from "./repository";
import { serviceAnalyticsCreateSchema, serviceAnalyticsListSchema, serviceAnalyticsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ServiceAnalyticsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const serviceAnalyticsService = {
  async list(input: unknown) {
    return serviceAnalyticsRepository.list(serviceAnalyticsListSchema.parse(input));
  },

  async create(input: unknown, context: ServiceAnalyticsActionContext) {
    const parsed = serviceAnalyticsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return serviceAnalyticsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ServiceAnalyticsActionContext) {
    const current = await serviceAnalyticsRepository.getById(tenantId, id);
    if (!current) throw new Error("Service Analytics record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return serviceAnalyticsRepository.update(tenantId, id, serviceAnalyticsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ServiceAnalyticsActionContext) {
    const current = await serviceAnalyticsRepository.getById(tenantId, id);
    if (!current) throw new Error("Service Analytics record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return serviceAnalyticsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await serviceAnalyticsRepository.getById(tenantId, id);
    if (!record) throw new Error("Service Analytics record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

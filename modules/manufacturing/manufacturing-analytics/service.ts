import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { manufacturingAnalyticsRepository } from "./repository";
import { manufacturingAnalyticsCreateSchema, manufacturingAnalyticsListSchema, manufacturingAnalyticsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ManufacturingAnalyticsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const manufacturingAnalyticsService = {
  async list(input: unknown) {
    return manufacturingAnalyticsRepository.list(manufacturingAnalyticsListSchema.parse(input));
  },

  async create(input: unknown, context: ManufacturingAnalyticsActionContext) {
    const parsed = manufacturingAnalyticsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return manufacturingAnalyticsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ManufacturingAnalyticsActionContext) {
    const current = await manufacturingAnalyticsRepository.getById(tenantId, id);
    if (!current) throw new Error("Manufacturing Analytics record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return manufacturingAnalyticsRepository.update(tenantId, id, manufacturingAnalyticsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ManufacturingAnalyticsActionContext) {
    const current = await manufacturingAnalyticsRepository.getById(tenantId, id);
    if (!current) throw new Error("Manufacturing Analytics record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return manufacturingAnalyticsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await manufacturingAnalyticsRepository.getById(tenantId, id);
    if (!record) throw new Error("Manufacturing Analytics record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

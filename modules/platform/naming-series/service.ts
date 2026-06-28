import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { namingSeriesRepository } from "./repository";
import { namingSeriesCreateSchema, namingSeriesListSchema, namingSeriesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { NamingSeriesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const namingSeriesService = {
  async list(input: unknown) {
    return namingSeriesRepository.list(namingSeriesListSchema.parse(input));
  },

  async create(input: unknown, context: NamingSeriesActionContext) {
    const parsed = namingSeriesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return namingSeriesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: NamingSeriesActionContext) {
    const current = await namingSeriesRepository.getById(tenantId, id);
    if (!current) throw new Error("Naming Series record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return namingSeriesRepository.update(tenantId, id, namingSeriesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: NamingSeriesActionContext) {
    const current = await namingSeriesRepository.getById(tenantId, id);
    if (!current) throw new Error("Naming Series record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return namingSeriesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await namingSeriesRepository.getById(tenantId, id);
    if (!record) throw new Error("Naming Series record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { dashboardsRepository } from "./repository";
import { dashboardsCreateSchema, dashboardsListSchema, dashboardsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DashboardsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const dashboardsService = {
  async list(input: unknown) {
    return dashboardsRepository.list(dashboardsListSchema.parse(input));
  },

  async create(input: unknown, context: DashboardsActionContext) {
    const parsed = dashboardsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return dashboardsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DashboardsActionContext) {
    const current = await dashboardsRepository.getById(tenantId, id);
    if (!current) throw new Error("Dashboards record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return dashboardsRepository.update(tenantId, id, dashboardsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DashboardsActionContext) {
    const current = await dashboardsRepository.getById(tenantId, id);
    if (!current) throw new Error("Dashboards record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return dashboardsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await dashboardsRepository.getById(tenantId, id);
    if (!record) throw new Error("Dashboards record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

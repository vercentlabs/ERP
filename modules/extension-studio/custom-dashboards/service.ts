import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { customDashboardsRepository } from "./repository";
import { customDashboardsCreateSchema, customDashboardsListSchema, customDashboardsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CustomDashboardsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const customDashboardsService = {
  async list(input: unknown) {
    return customDashboardsRepository.list(customDashboardsListSchema.parse(input));
  },

  async create(input: unknown, context: CustomDashboardsActionContext) {
    const parsed = customDashboardsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return customDashboardsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CustomDashboardsActionContext) {
    const current = await customDashboardsRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Dashboards record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return customDashboardsRepository.update(tenantId, id, customDashboardsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CustomDashboardsActionContext) {
    const current = await customDashboardsRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Dashboards record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return customDashboardsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await customDashboardsRepository.getById(tenantId, id);
    if (!record) throw new Error("Custom Dashboards record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

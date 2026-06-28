import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { installedAppsRepository } from "./repository";
import { installedAppsCreateSchema, installedAppsListSchema, installedAppsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { InstalledAppsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const installedAppsService = {
  async list(input: unknown) {
    return installedAppsRepository.list(installedAppsListSchema.parse(input));
  },

  async create(input: unknown, context: InstalledAppsActionContext) {
    const parsed = installedAppsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return installedAppsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: InstalledAppsActionContext) {
    const current = await installedAppsRepository.getById(tenantId, id);
    if (!current) throw new Error("Installed Apps record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return installedAppsRepository.update(tenantId, id, installedAppsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: InstalledAppsActionContext) {
    const current = await installedAppsRepository.getById(tenantId, id);
    if (!current) throw new Error("Installed Apps record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return installedAppsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await installedAppsRepository.getById(tenantId, id);
    if (!record) throw new Error("Installed Apps record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { dockManagementRepository } from "./repository";
import { dockManagementCreateSchema, dockManagementListSchema, dockManagementUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DockManagementActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const dockManagementService = {
  async list(input: unknown) {
    return dockManagementRepository.list(dockManagementListSchema.parse(input));
  },

  async create(input: unknown, context: DockManagementActionContext) {
    const parsed = dockManagementCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return dockManagementRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DockManagementActionContext) {
    const current = await dockManagementRepository.getById(tenantId, id);
    if (!current) throw new Error("Dock Management record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return dockManagementRepository.update(tenantId, id, dockManagementUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DockManagementActionContext) {
    const current = await dockManagementRepository.getById(tenantId, id);
    if (!current) throw new Error("Dock Management record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return dockManagementRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await dockManagementRepository.getById(tenantId, id);
    if (!record) throw new Error("Dock Management record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

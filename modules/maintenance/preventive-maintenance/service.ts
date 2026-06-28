import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { preventiveMaintenanceRepository } from "./repository";
import { preventiveMaintenanceCreateSchema, preventiveMaintenanceListSchema, preventiveMaintenanceUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PreventiveMaintenanceActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const preventiveMaintenanceService = {
  async list(input: unknown) {
    return preventiveMaintenanceRepository.list(preventiveMaintenanceListSchema.parse(input));
  },

  async create(input: unknown, context: PreventiveMaintenanceActionContext) {
    const parsed = preventiveMaintenanceCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return preventiveMaintenanceRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PreventiveMaintenanceActionContext) {
    const current = await preventiveMaintenanceRepository.getById(tenantId, id);
    if (!current) throw new Error("Preventive Maintenance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return preventiveMaintenanceRepository.update(tenantId, id, preventiveMaintenanceUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PreventiveMaintenanceActionContext) {
    const current = await preventiveMaintenanceRepository.getById(tenantId, id);
    if (!current) throw new Error("Preventive Maintenance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return preventiveMaintenanceRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await preventiveMaintenanceRepository.getById(tenantId, id);
    if (!record) throw new Error("Preventive Maintenance record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

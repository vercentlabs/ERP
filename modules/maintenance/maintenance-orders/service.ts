import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { maintenanceOrdersRepository } from "./repository";
import { maintenanceOrdersCreateSchema, maintenanceOrdersListSchema, maintenanceOrdersUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { MaintenanceOrdersActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const maintenanceOrdersService = {
  async list(input: unknown) {
    return maintenanceOrdersRepository.list(maintenanceOrdersListSchema.parse(input));
  },

  async create(input: unknown, context: MaintenanceOrdersActionContext) {
    const parsed = maintenanceOrdersCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return maintenanceOrdersRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: MaintenanceOrdersActionContext) {
    const current = await maintenanceOrdersRepository.getById(tenantId, id);
    if (!current) throw new Error("Maintenance Orders record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return maintenanceOrdersRepository.update(tenantId, id, maintenanceOrdersUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: MaintenanceOrdersActionContext) {
    const current = await maintenanceOrdersRepository.getById(tenantId, id);
    if (!current) throw new Error("Maintenance Orders record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return maintenanceOrdersRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await maintenanceOrdersRepository.getById(tenantId, id);
    if (!record) throw new Error("Maintenance Orders record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

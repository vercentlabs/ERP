import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { warehousesRepository } from "./repository";
import { warehousesCreateSchema, warehousesListSchema, warehousesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { WarehousesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const warehousesService = {
  async list(input: unknown) {
    return warehousesRepository.list(warehousesListSchema.parse(input));
  },

  async create(input: unknown, context: WarehousesActionContext) {
    const parsed = warehousesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return warehousesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: WarehousesActionContext) {
    const current = await warehousesRepository.getById(tenantId, id);
    if (!current) throw new Error("Warehouses record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return warehousesRepository.update(tenantId, id, warehousesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: WarehousesActionContext) {
    const current = await warehousesRepository.getById(tenantId, id);
    if (!current) throw new Error("Warehouses record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return warehousesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await warehousesRepository.getById(tenantId, id);
    if (!record) throw new Error("Warehouses record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

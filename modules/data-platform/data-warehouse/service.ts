import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { dataWarehouseRepository } from "./repository";
import { dataWarehouseCreateSchema, dataWarehouseListSchema, dataWarehouseUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DataWarehouseActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const dataWarehouseService = {
  async list(input: unknown) {
    return dataWarehouseRepository.list(dataWarehouseListSchema.parse(input));
  },

  async create(input: unknown, context: DataWarehouseActionContext) {
    const parsed = dataWarehouseCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return dataWarehouseRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DataWarehouseActionContext) {
    const current = await dataWarehouseRepository.getById(tenantId, id);
    if (!current) throw new Error("Data Warehouse record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return dataWarehouseRepository.update(tenantId, id, dataWarehouseUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DataWarehouseActionContext) {
    const current = await dataWarehouseRepository.getById(tenantId, id);
    if (!current) throw new Error("Data Warehouse record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return dataWarehouseRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await dataWarehouseRepository.getById(tenantId, id);
    if (!record) throw new Error("Data Warehouse record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { productionCostingRepository } from "./repository";
import { productionCostingCreateSchema, productionCostingListSchema, productionCostingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProductionCostingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const productionCostingService = {
  async list(input: unknown) {
    return productionCostingRepository.list(productionCostingListSchema.parse(input));
  },

  async create(input: unknown, context: ProductionCostingActionContext) {
    const parsed = productionCostingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return productionCostingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProductionCostingActionContext) {
    const current = await productionCostingRepository.getById(tenantId, id);
    if (!current) throw new Error("Production Costing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return productionCostingRepository.update(tenantId, id, productionCostingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProductionCostingActionContext) {
    const current = await productionCostingRepository.getById(tenantId, id);
    if (!current) throw new Error("Production Costing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return productionCostingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await productionCostingRepository.getById(tenantId, id);
    if (!record) throw new Error("Production Costing record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

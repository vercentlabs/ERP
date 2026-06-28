import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { productionOrdersRepository } from "./repository";
import { productionOrdersCreateSchema, productionOrdersListSchema, productionOrdersUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProductionOrdersActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const productionOrdersService = {
  async list(input: unknown) {
    return productionOrdersRepository.list(productionOrdersListSchema.parse(input));
  },

  async create(input: unknown, context: ProductionOrdersActionContext) {
    const parsed = productionOrdersCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return productionOrdersRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProductionOrdersActionContext) {
    const current = await productionOrdersRepository.getById(tenantId, id);
    if (!current) throw new Error("Production Orders record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return productionOrdersRepository.update(tenantId, id, productionOrdersUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProductionOrdersActionContext) {
    const current = await productionOrdersRepository.getById(tenantId, id);
    if (!current) throw new Error("Production Orders record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return productionOrdersRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await productionOrdersRepository.getById(tenantId, id);
    if (!record) throw new Error("Production Orders record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

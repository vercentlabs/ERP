import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { purchaseOrdersRepository } from "./repository";
import { purchaseOrdersCreateSchema, purchaseOrdersListSchema, purchaseOrdersUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PurchaseOrdersActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const purchaseOrdersService = {
  async list(input: unknown) {
    return purchaseOrdersRepository.list(purchaseOrdersListSchema.parse(input));
  },

  async create(input: unknown, context: PurchaseOrdersActionContext) {
    const parsed = purchaseOrdersCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return purchaseOrdersRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PurchaseOrdersActionContext) {
    const current = await purchaseOrdersRepository.getById(tenantId, id);
    if (!current) throw new Error("Purchase Orders record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return purchaseOrdersRepository.update(tenantId, id, purchaseOrdersUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PurchaseOrdersActionContext) {
    const current = await purchaseOrdersRepository.getById(tenantId, id);
    if (!current) throw new Error("Purchase Orders record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return purchaseOrdersRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await purchaseOrdersRepository.getById(tenantId, id);
    if (!record) throw new Error("Purchase Orders record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

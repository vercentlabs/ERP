import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { purchaseRequisitionsRepository } from "./repository";
import { purchaseRequisitionsCreateSchema, purchaseRequisitionsListSchema, purchaseRequisitionsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PurchaseRequisitionsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const purchaseRequisitionsService = {
  async list(input: unknown) {
    return purchaseRequisitionsRepository.list(purchaseRequisitionsListSchema.parse(input));
  },

  async create(input: unknown, context: PurchaseRequisitionsActionContext) {
    const parsed = purchaseRequisitionsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return purchaseRequisitionsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PurchaseRequisitionsActionContext) {
    const current = await purchaseRequisitionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Purchase Requisitions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return purchaseRequisitionsRepository.update(tenantId, id, purchaseRequisitionsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PurchaseRequisitionsActionContext) {
    const current = await purchaseRequisitionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Purchase Requisitions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return purchaseRequisitionsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await purchaseRequisitionsRepository.getById(tenantId, id);
    if (!record) throw new Error("Purchase Requisitions record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

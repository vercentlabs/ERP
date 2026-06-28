import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { purchaseReturnsRepository } from "./repository";
import { purchaseReturnsCreateSchema, purchaseReturnsListSchema, purchaseReturnsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PurchaseReturnsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const purchaseReturnsService = {
  async list(input: unknown) {
    return purchaseReturnsRepository.list(purchaseReturnsListSchema.parse(input));
  },

  async create(input: unknown, context: PurchaseReturnsActionContext) {
    const parsed = purchaseReturnsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return purchaseReturnsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PurchaseReturnsActionContext) {
    const current = await purchaseReturnsRepository.getById(tenantId, id);
    if (!current) throw new Error("Purchase Returns record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return purchaseReturnsRepository.update(tenantId, id, purchaseReturnsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PurchaseReturnsActionContext) {
    const current = await purchaseReturnsRepository.getById(tenantId, id);
    if (!current) throw new Error("Purchase Returns record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return purchaseReturnsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await purchaseReturnsRepository.getById(tenantId, id);
    if (!record) throw new Error("Purchase Returns record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

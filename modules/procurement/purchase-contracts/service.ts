import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { purchaseContractsRepository } from "./repository";
import { purchaseContractsCreateSchema, purchaseContractsListSchema, purchaseContractsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PurchaseContractsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const purchaseContractsService = {
  async list(input: unknown) {
    return purchaseContractsRepository.list(purchaseContractsListSchema.parse(input));
  },

  async create(input: unknown, context: PurchaseContractsActionContext) {
    const parsed = purchaseContractsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return purchaseContractsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PurchaseContractsActionContext) {
    const current = await purchaseContractsRepository.getById(tenantId, id);
    if (!current) throw new Error("Purchase Contracts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return purchaseContractsRepository.update(tenantId, id, purchaseContractsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PurchaseContractsActionContext) {
    const current = await purchaseContractsRepository.getById(tenantId, id);
    if (!current) throw new Error("Purchase Contracts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return purchaseContractsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await purchaseContractsRepository.getById(tenantId, id);
    if (!record) throw new Error("Purchase Contracts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

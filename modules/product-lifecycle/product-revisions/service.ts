import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { productRevisionsRepository } from "./repository";
import { productRevisionsCreateSchema, productRevisionsListSchema, productRevisionsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProductRevisionsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const productRevisionsService = {
  async list(input: unknown) {
    return productRevisionsRepository.list(productRevisionsListSchema.parse(input));
  },

  async create(input: unknown, context: ProductRevisionsActionContext) {
    const parsed = productRevisionsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return productRevisionsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProductRevisionsActionContext) {
    const current = await productRevisionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Product Revisions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return productRevisionsRepository.update(tenantId, id, productRevisionsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProductRevisionsActionContext) {
    const current = await productRevisionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Product Revisions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return productRevisionsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await productRevisionsRepository.getById(tenantId, id);
    if (!record) throw new Error("Product Revisions record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

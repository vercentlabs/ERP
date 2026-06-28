import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { receiptsRepository } from "./repository";
import { receiptsCreateSchema, receiptsListSchema, receiptsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ReceiptsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const receiptsService = {
  async list(input: unknown) {
    return receiptsRepository.list(receiptsListSchema.parse(input));
  },

  async create(input: unknown, context: ReceiptsActionContext) {
    const parsed = receiptsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return receiptsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ReceiptsActionContext) {
    const current = await receiptsRepository.getById(tenantId, id);
    if (!current) throw new Error("Receipts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return receiptsRepository.update(tenantId, id, receiptsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ReceiptsActionContext) {
    const current = await receiptsRepository.getById(tenantId, id);
    if (!current) throw new Error("Receipts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return receiptsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await receiptsRepository.getById(tenantId, id);
    if (!record) throw new Error("Receipts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

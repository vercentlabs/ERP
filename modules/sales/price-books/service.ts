import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { priceBooksRepository } from "./repository";
import { priceBooksCreateSchema, priceBooksListSchema, priceBooksUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PriceBooksActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const priceBooksService = {
  async list(input: unknown) {
    return priceBooksRepository.list(priceBooksListSchema.parse(input));
  },

  async create(input: unknown, context: PriceBooksActionContext) {
    const parsed = priceBooksCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return priceBooksRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PriceBooksActionContext) {
    const current = await priceBooksRepository.getById(tenantId, id);
    if (!current) throw new Error("Price Books record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return priceBooksRepository.update(tenantId, id, priceBooksUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PriceBooksActionContext) {
    const current = await priceBooksRepository.getById(tenantId, id);
    if (!current) throw new Error("Price Books record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return priceBooksRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await priceBooksRepository.getById(tenantId, id);
    if (!record) throw new Error("Price Books record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

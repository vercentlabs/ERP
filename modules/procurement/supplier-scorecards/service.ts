import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { supplierScorecardsRepository } from "./repository";
import { supplierScorecardsCreateSchema, supplierScorecardsListSchema, supplierScorecardsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SupplierScorecardsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const supplierScorecardsService = {
  async list(input: unknown) {
    return supplierScorecardsRepository.list(supplierScorecardsListSchema.parse(input));
  },

  async create(input: unknown, context: SupplierScorecardsActionContext) {
    const parsed = supplierScorecardsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return supplierScorecardsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SupplierScorecardsActionContext) {
    const current = await supplierScorecardsRepository.getById(tenantId, id);
    if (!current) throw new Error("Supplier Scorecards record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return supplierScorecardsRepository.update(tenantId, id, supplierScorecardsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SupplierScorecardsActionContext) {
    const current = await supplierScorecardsRepository.getById(tenantId, id);
    if (!current) throw new Error("Supplier Scorecards record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return supplierScorecardsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await supplierScorecardsRepository.getById(tenantId, id);
    if (!record) throw new Error("Supplier Scorecards record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

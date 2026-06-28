import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { taxesRepository } from "./repository";
import { taxesCreateSchema, taxesListSchema, taxesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { TaxesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const taxesService = {
  async list(input: unknown) {
    return taxesRepository.list(taxesListSchema.parse(input));
  },

  async create(input: unknown, context: TaxesActionContext) {
    const parsed = taxesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return taxesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: TaxesActionContext) {
    const current = await taxesRepository.getById(tenantId, id);
    if (!current) throw new Error("Taxes record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return taxesRepository.update(tenantId, id, taxesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: TaxesActionContext) {
    const current = await taxesRepository.getById(tenantId, id);
    if (!current) throw new Error("Taxes record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return taxesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await taxesRepository.getById(tenantId, id);
    if (!record) throw new Error("Taxes record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

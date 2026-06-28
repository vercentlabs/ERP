import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { formulaFieldsRepository } from "./repository";
import { formulaFieldsCreateSchema, formulaFieldsListSchema, formulaFieldsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { FormulaFieldsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const formulaFieldsService = {
  async list(input: unknown) {
    return formulaFieldsRepository.list(formulaFieldsListSchema.parse(input));
  },

  async create(input: unknown, context: FormulaFieldsActionContext) {
    const parsed = formulaFieldsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return formulaFieldsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: FormulaFieldsActionContext) {
    const current = await formulaFieldsRepository.getById(tenantId, id);
    if (!current) throw new Error("Formula Fields record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return formulaFieldsRepository.update(tenantId, id, formulaFieldsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: FormulaFieldsActionContext) {
    const current = await formulaFieldsRepository.getById(tenantId, id);
    if (!current) throw new Error("Formula Fields record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return formulaFieldsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await formulaFieldsRepository.getById(tenantId, id);
    if (!record) throw new Error("Formula Fields record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

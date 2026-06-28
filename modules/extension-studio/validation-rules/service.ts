import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { validationRulesRepository } from "./repository";
import { validationRulesCreateSchema, validationRulesListSchema, validationRulesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ValidationRulesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const validationRulesService = {
  async list(input: unknown) {
    return validationRulesRepository.list(validationRulesListSchema.parse(input));
  },

  async create(input: unknown, context: ValidationRulesActionContext) {
    const parsed = validationRulesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return validationRulesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ValidationRulesActionContext) {
    const current = await validationRulesRepository.getById(tenantId, id);
    if (!current) throw new Error("Validation Rules record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return validationRulesRepository.update(tenantId, id, validationRulesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ValidationRulesActionContext) {
    const current = await validationRulesRepository.getById(tenantId, id);
    if (!current) throw new Error("Validation Rules record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return validationRulesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await validationRulesRepository.getById(tenantId, id);
    if (!record) throw new Error("Validation Rules record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

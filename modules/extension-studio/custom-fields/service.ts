import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { customFieldsRepository } from "./repository";
import { customFieldsCreateSchema, customFieldsListSchema, customFieldsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CustomFieldsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const customFieldsService = {
  async list(input: unknown) {
    return customFieldsRepository.list(customFieldsListSchema.parse(input));
  },

  async create(input: unknown, context: CustomFieldsActionContext) {
    const parsed = customFieldsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return customFieldsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CustomFieldsActionContext) {
    const current = await customFieldsRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Fields record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return customFieldsRepository.update(tenantId, id, customFieldsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CustomFieldsActionContext) {
    const current = await customFieldsRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Fields record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return customFieldsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await customFieldsRepository.getById(tenantId, id);
    if (!record) throw new Error("Custom Fields record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

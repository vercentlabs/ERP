import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { customObjectsRepository } from "./repository";
import { customObjectsCreateSchema, customObjectsListSchema, customObjectsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CustomObjectsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const customObjectsService = {
  async list(input: unknown) {
    return customObjectsRepository.list(customObjectsListSchema.parse(input));
  },

  async create(input: unknown, context: CustomObjectsActionContext) {
    const parsed = customObjectsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return customObjectsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CustomObjectsActionContext) {
    const current = await customObjectsRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Objects record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return customObjectsRepository.update(tenantId, id, customObjectsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CustomObjectsActionContext) {
    const current = await customObjectsRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Objects record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return customObjectsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await customObjectsRepository.getById(tenantId, id);
    if (!record) throw new Error("Custom Objects record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

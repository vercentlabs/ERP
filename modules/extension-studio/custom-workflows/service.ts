import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { customWorkflowsRepository } from "./repository";
import { customWorkflowsCreateSchema, customWorkflowsListSchema, customWorkflowsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CustomWorkflowsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const customWorkflowsService = {
  async list(input: unknown) {
    return customWorkflowsRepository.list(customWorkflowsListSchema.parse(input));
  },

  async create(input: unknown, context: CustomWorkflowsActionContext) {
    const parsed = customWorkflowsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return customWorkflowsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CustomWorkflowsActionContext) {
    const current = await customWorkflowsRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Workflows record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return customWorkflowsRepository.update(tenantId, id, customWorkflowsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CustomWorkflowsActionContext) {
    const current = await customWorkflowsRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Workflows record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return customWorkflowsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await customWorkflowsRepository.getById(tenantId, id);
    if (!record) throw new Error("Custom Workflows record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

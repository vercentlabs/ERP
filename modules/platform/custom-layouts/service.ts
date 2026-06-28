import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { customLayoutsRepository } from "./repository";
import { customLayoutsCreateSchema, customLayoutsListSchema, customLayoutsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CustomLayoutsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const customLayoutsService = {
  async list(input: unknown) {
    return customLayoutsRepository.list(customLayoutsListSchema.parse(input));
  },

  async create(input: unknown, context: CustomLayoutsActionContext) {
    const parsed = customLayoutsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return customLayoutsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CustomLayoutsActionContext) {
    const current = await customLayoutsRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Layouts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return customLayoutsRepository.update(tenantId, id, customLayoutsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CustomLayoutsActionContext) {
    const current = await customLayoutsRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Layouts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return customLayoutsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await customLayoutsRepository.getById(tenantId, id);
    if (!record) throw new Error("Custom Layouts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

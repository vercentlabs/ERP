import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { customPagesRepository } from "./repository";
import { customPagesCreateSchema, customPagesListSchema, customPagesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CustomPagesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const customPagesService = {
  async list(input: unknown) {
    return customPagesRepository.list(customPagesListSchema.parse(input));
  },

  async create(input: unknown, context: CustomPagesActionContext) {
    const parsed = customPagesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return customPagesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CustomPagesActionContext) {
    const current = await customPagesRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Pages record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return customPagesRepository.update(tenantId, id, customPagesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CustomPagesActionContext) {
    const current = await customPagesRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Pages record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return customPagesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await customPagesRepository.getById(tenantId, id);
    if (!record) throw new Error("Custom Pages record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

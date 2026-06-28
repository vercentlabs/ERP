import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { customReportsRepository } from "./repository";
import { customReportsCreateSchema, customReportsListSchema, customReportsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CustomReportsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const customReportsService = {
  async list(input: unknown) {
    return customReportsRepository.list(customReportsListSchema.parse(input));
  },

  async create(input: unknown, context: CustomReportsActionContext) {
    const parsed = customReportsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return customReportsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CustomReportsActionContext) {
    const current = await customReportsRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Reports record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return customReportsRepository.update(tenantId, id, customReportsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CustomReportsActionContext) {
    const current = await customReportsRepository.getById(tenantId, id);
    if (!current) throw new Error("Custom Reports record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return customReportsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await customReportsRepository.getById(tenantId, id);
    if (!record) throw new Error("Custom Reports record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

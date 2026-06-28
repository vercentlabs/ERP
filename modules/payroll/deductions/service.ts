import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { deductionsRepository } from "./repository";
import { deductionsCreateSchema, deductionsListSchema, deductionsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DeductionsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const deductionsService = {
  async list(input: unknown) {
    return deductionsRepository.list(deductionsListSchema.parse(input));
  },

  async create(input: unknown, context: DeductionsActionContext) {
    const parsed = deductionsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return deductionsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DeductionsActionContext) {
    const current = await deductionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Deductions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return deductionsRepository.update(tenantId, id, deductionsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DeductionsActionContext) {
    const current = await deductionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Deductions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return deductionsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await deductionsRepository.getById(tenantId, id);
    if (!record) throw new Error("Deductions record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

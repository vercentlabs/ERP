import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { financialReportsRepository } from "./repository";
import { financialReportsCreateSchema, financialReportsListSchema, financialReportsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { FinancialReportsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const financialReportsService = {
  async list(input: unknown) {
    return financialReportsRepository.list(financialReportsListSchema.parse(input));
  },

  async create(input: unknown, context: FinancialReportsActionContext) {
    const parsed = financialReportsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return financialReportsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: FinancialReportsActionContext) {
    const current = await financialReportsRepository.getById(tenantId, id);
    if (!current) throw new Error("Financial Reports record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return financialReportsRepository.update(tenantId, id, financialReportsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: FinancialReportsActionContext) {
    const current = await financialReportsRepository.getById(tenantId, id);
    if (!current) throw new Error("Financial Reports record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return financialReportsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await financialReportsRepository.getById(tenantId, id);
    if (!record) throw new Error("Financial Reports record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

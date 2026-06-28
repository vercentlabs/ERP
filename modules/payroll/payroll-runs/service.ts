import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { payrollRunsRepository } from "./repository";
import { payrollRunsCreateSchema, payrollRunsListSchema, payrollRunsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PayrollRunsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const payrollRunsService = {
  async list(input: unknown) {
    return payrollRunsRepository.list(payrollRunsListSchema.parse(input));
  },

  async create(input: unknown, context: PayrollRunsActionContext) {
    const parsed = payrollRunsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return payrollRunsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PayrollRunsActionContext) {
    const current = await payrollRunsRepository.getById(tenantId, id);
    if (!current) throw new Error("Payroll Runs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return payrollRunsRepository.update(tenantId, id, payrollRunsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PayrollRunsActionContext) {
    const current = await payrollRunsRepository.getById(tenantId, id);
    if (!current) throw new Error("Payroll Runs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return payrollRunsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await payrollRunsRepository.getById(tenantId, id);
    if (!record) throw new Error("Payroll Runs record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

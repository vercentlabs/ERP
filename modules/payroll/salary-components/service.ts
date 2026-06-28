import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { salaryComponentsRepository } from "./repository";
import { salaryComponentsCreateSchema, salaryComponentsListSchema, salaryComponentsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SalaryComponentsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const salaryComponentsService = {
  async list(input: unknown) {
    return salaryComponentsRepository.list(salaryComponentsListSchema.parse(input));
  },

  async create(input: unknown, context: SalaryComponentsActionContext) {
    const parsed = salaryComponentsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return salaryComponentsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SalaryComponentsActionContext) {
    const current = await salaryComponentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Salary Components record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return salaryComponentsRepository.update(tenantId, id, salaryComponentsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SalaryComponentsActionContext) {
    const current = await salaryComponentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Salary Components record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return salaryComponentsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await salaryComponentsRepository.getById(tenantId, id);
    if (!record) throw new Error("Salary Components record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

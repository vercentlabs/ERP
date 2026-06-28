import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { salaryStructuresRepository } from "./repository";
import { salaryStructuresCreateSchema, salaryStructuresListSchema, salaryStructuresUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SalaryStructuresActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const salaryStructuresService = {
  async list(input: unknown) {
    return salaryStructuresRepository.list(salaryStructuresListSchema.parse(input));
  },

  async create(input: unknown, context: SalaryStructuresActionContext) {
    const parsed = salaryStructuresCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return salaryStructuresRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SalaryStructuresActionContext) {
    const current = await salaryStructuresRepository.getById(tenantId, id);
    if (!current) throw new Error("Salary Structures record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return salaryStructuresRepository.update(tenantId, id, salaryStructuresUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SalaryStructuresActionContext) {
    const current = await salaryStructuresRepository.getById(tenantId, id);
    if (!current) throw new Error("Salary Structures record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return salaryStructuresRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await salaryStructuresRepository.getById(tenantId, id);
    if (!record) throw new Error("Salary Structures record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

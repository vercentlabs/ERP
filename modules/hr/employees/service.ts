import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { employeesRepository } from "./repository";
import { employeesCreateSchema, employeesListSchema, employeesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { EmployeesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const employeesService = {
  async list(input: unknown) {
    return employeesRepository.list(employeesListSchema.parse(input));
  },

  async create(input: unknown, context: EmployeesActionContext) {
    const parsed = employeesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return employeesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: EmployeesActionContext) {
    const current = await employeesRepository.getById(tenantId, id);
    if (!current) throw new Error("Employees record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return employeesRepository.update(tenantId, id, employeesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: EmployeesActionContext) {
    const current = await employeesRepository.getById(tenantId, id);
    if (!current) throw new Error("Employees record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return employeesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await employeesRepository.getById(tenantId, id);
    if (!record) throw new Error("Employees record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

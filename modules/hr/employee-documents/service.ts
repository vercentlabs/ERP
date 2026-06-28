import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { employeeDocumentsRepository } from "./repository";
import { employeeDocumentsCreateSchema, employeeDocumentsListSchema, employeeDocumentsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { EmployeeDocumentsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const employeeDocumentsService = {
  async list(input: unknown) {
    return employeeDocumentsRepository.list(employeeDocumentsListSchema.parse(input));
  },

  async create(input: unknown, context: EmployeeDocumentsActionContext) {
    const parsed = employeeDocumentsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return employeeDocumentsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: EmployeeDocumentsActionContext) {
    const current = await employeeDocumentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Employee Documents record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return employeeDocumentsRepository.update(tenantId, id, employeeDocumentsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: EmployeeDocumentsActionContext) {
    const current = await employeeDocumentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Employee Documents record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return employeeDocumentsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await employeeDocumentsRepository.getById(tenantId, id);
    if (!record) throw new Error("Employee Documents record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

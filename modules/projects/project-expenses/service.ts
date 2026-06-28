import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { projectExpensesRepository } from "./repository";
import { projectExpensesCreateSchema, projectExpensesListSchema, projectExpensesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProjectExpensesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const projectExpensesService = {
  async list(input: unknown) {
    return projectExpensesRepository.list(projectExpensesListSchema.parse(input));
  },

  async create(input: unknown, context: ProjectExpensesActionContext) {
    const parsed = projectExpensesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return projectExpensesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProjectExpensesActionContext) {
    const current = await projectExpensesRepository.getById(tenantId, id);
    if (!current) throw new Error("Project Expenses record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return projectExpensesRepository.update(tenantId, id, projectExpensesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProjectExpensesActionContext) {
    const current = await projectExpensesRepository.getById(tenantId, id);
    if (!current) throw new Error("Project Expenses record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return projectExpensesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await projectExpensesRepository.getById(tenantId, id);
    if (!record) throw new Error("Project Expenses record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

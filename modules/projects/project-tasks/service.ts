import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { projectTasksRepository } from "./repository";
import { projectTasksCreateSchema, projectTasksListSchema, projectTasksUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProjectTasksActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const projectTasksService = {
  async list(input: unknown) {
    return projectTasksRepository.list(projectTasksListSchema.parse(input));
  },

  async create(input: unknown, context: ProjectTasksActionContext) {
    const parsed = projectTasksCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return projectTasksRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProjectTasksActionContext) {
    const current = await projectTasksRepository.getById(tenantId, id);
    if (!current) throw new Error("Project Tasks record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return projectTasksRepository.update(tenantId, id, projectTasksUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProjectTasksActionContext) {
    const current = await projectTasksRepository.getById(tenantId, id);
    if (!current) throw new Error("Project Tasks record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return projectTasksRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await projectTasksRepository.getById(tenantId, id);
    if (!record) throw new Error("Project Tasks record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

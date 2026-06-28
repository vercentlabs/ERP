import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { projectCostingRepository } from "./repository";
import { projectCostingCreateSchema, projectCostingListSchema, projectCostingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProjectCostingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const projectCostingService = {
  async list(input: unknown) {
    return projectCostingRepository.list(projectCostingListSchema.parse(input));
  },

  async create(input: unknown, context: ProjectCostingActionContext) {
    const parsed = projectCostingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return projectCostingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProjectCostingActionContext) {
    const current = await projectCostingRepository.getById(tenantId, id);
    if (!current) throw new Error("Project Costing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return projectCostingRepository.update(tenantId, id, projectCostingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProjectCostingActionContext) {
    const current = await projectCostingRepository.getById(tenantId, id);
    if (!current) throw new Error("Project Costing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return projectCostingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await projectCostingRepository.getById(tenantId, id);
    if (!record) throw new Error("Project Costing record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

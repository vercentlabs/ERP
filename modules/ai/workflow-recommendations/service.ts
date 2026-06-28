import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { workflowRecommendationsRepository } from "./repository";
import { workflowRecommendationsCreateSchema, workflowRecommendationsListSchema, workflowRecommendationsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { WorkflowRecommendationsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const workflowRecommendationsService = {
  async list(input: unknown) {
    return workflowRecommendationsRepository.list(workflowRecommendationsListSchema.parse(input));
  },

  async create(input: unknown, context: WorkflowRecommendationsActionContext) {
    const parsed = workflowRecommendationsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return workflowRecommendationsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: WorkflowRecommendationsActionContext) {
    const current = await workflowRecommendationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Workflow Recommendations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return workflowRecommendationsRepository.update(tenantId, id, workflowRecommendationsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: WorkflowRecommendationsActionContext) {
    const current = await workflowRecommendationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Workflow Recommendations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return workflowRecommendationsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await workflowRecommendationsRepository.getById(tenantId, id);
    if (!record) throw new Error("Workflow Recommendations record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

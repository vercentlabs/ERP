import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { varianceAnalysisRepository } from "./repository";
import { varianceAnalysisCreateSchema, varianceAnalysisListSchema, varianceAnalysisUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { VarianceAnalysisActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const varianceAnalysisService = {
  async list(input: unknown) {
    return varianceAnalysisRepository.list(varianceAnalysisListSchema.parse(input));
  },

  async create(input: unknown, context: VarianceAnalysisActionContext) {
    const parsed = varianceAnalysisCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return varianceAnalysisRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: VarianceAnalysisActionContext) {
    const current = await varianceAnalysisRepository.getById(tenantId, id);
    if (!current) throw new Error("Variance Analysis record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return varianceAnalysisRepository.update(tenantId, id, varianceAnalysisUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: VarianceAnalysisActionContext) {
    const current = await varianceAnalysisRepository.getById(tenantId, id);
    if (!current) throw new Error("Variance Analysis record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return varianceAnalysisRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await varianceAnalysisRepository.getById(tenantId, id);
    if (!record) throw new Error("Variance Analysis record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

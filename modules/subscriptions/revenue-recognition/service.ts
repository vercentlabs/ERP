import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { revenueRecognitionRepository } from "./repository";
import { revenueRecognitionCreateSchema, revenueRecognitionListSchema, revenueRecognitionUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { RevenueRecognitionActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const revenueRecognitionService = {
  async list(input: unknown) {
    return revenueRecognitionRepository.list(revenueRecognitionListSchema.parse(input));
  },

  async create(input: unknown, context: RevenueRecognitionActionContext) {
    const parsed = revenueRecognitionCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return revenueRecognitionRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: RevenueRecognitionActionContext) {
    const current = await revenueRecognitionRepository.getById(tenantId, id);
    if (!current) throw new Error("Revenue Recognition record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return revenueRecognitionRepository.update(tenantId, id, revenueRecognitionUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: RevenueRecognitionActionContext) {
    const current = await revenueRecognitionRepository.getById(tenantId, id);
    if (!current) throw new Error("Revenue Recognition record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return revenueRecognitionRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await revenueRecognitionRepository.getById(tenantId, id);
    if (!record) throw new Error("Revenue Recognition record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

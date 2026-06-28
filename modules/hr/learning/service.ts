import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { learningRepository } from "./repository";
import { learningCreateSchema, learningListSchema, learningUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { LearningActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const learningService = {
  async list(input: unknown) {
    return learningRepository.list(learningListSchema.parse(input));
  },

  async create(input: unknown, context: LearningActionContext) {
    const parsed = learningCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return learningRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: LearningActionContext) {
    const current = await learningRepository.getById(tenantId, id);
    if (!current) throw new Error("Learning record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return learningRepository.update(tenantId, id, learningUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: LearningActionContext) {
    const current = await learningRepository.getById(tenantId, id);
    if (!current) throw new Error("Learning record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return learningRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await learningRepository.getById(tenantId, id);
    if (!record) throw new Error("Learning record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

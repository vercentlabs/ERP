import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { knowledgeBaseRepository } from "./repository";
import { knowledgeBaseCreateSchema, knowledgeBaseListSchema, knowledgeBaseUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { KnowledgeBaseActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const knowledgeBaseService = {
  async list(input: unknown) {
    return knowledgeBaseRepository.list(knowledgeBaseListSchema.parse(input));
  },

  async create(input: unknown, context: KnowledgeBaseActionContext) {
    const parsed = knowledgeBaseCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return knowledgeBaseRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: KnowledgeBaseActionContext) {
    const current = await knowledgeBaseRepository.getById(tenantId, id);
    if (!current) throw new Error("Knowledge Base record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return knowledgeBaseRepository.update(tenantId, id, knowledgeBaseUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: KnowledgeBaseActionContext) {
    const current = await knowledgeBaseRepository.getById(tenantId, id);
    if (!current) throw new Error("Knowledge Base record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return knowledgeBaseRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await knowledgeBaseRepository.getById(tenantId, id);
    if (!record) throw new Error("Knowledge Base record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { constructionRepository } from "./repository";
import { constructionCreateSchema, constructionListSchema, constructionUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ConstructionActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const constructionService = {
  async list(input: unknown) {
    return constructionRepository.list(constructionListSchema.parse(input));
  },

  async create(input: unknown, context: ConstructionActionContext) {
    const parsed = constructionCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return constructionRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ConstructionActionContext) {
    const current = await constructionRepository.getById(tenantId, id);
    if (!current) throw new Error("Construction record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return constructionRepository.update(tenantId, id, constructionUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ConstructionActionContext) {
    const current = await constructionRepository.getById(tenantId, id);
    if (!current) throw new Error("Construction record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return constructionRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await constructionRepository.getById(tenantId, id);
    if (!record) throw new Error("Construction record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

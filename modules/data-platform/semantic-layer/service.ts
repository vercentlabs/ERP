import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { semanticLayerRepository } from "./repository";
import { semanticLayerCreateSchema, semanticLayerListSchema, semanticLayerUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SemanticLayerActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const semanticLayerService = {
  async list(input: unknown) {
    return semanticLayerRepository.list(semanticLayerListSchema.parse(input));
  },

  async create(input: unknown, context: SemanticLayerActionContext) {
    const parsed = semanticLayerCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return semanticLayerRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SemanticLayerActionContext) {
    const current = await semanticLayerRepository.getById(tenantId, id);
    if (!current) throw new Error("Semantic Layer record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return semanticLayerRepository.update(tenantId, id, semanticLayerUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SemanticLayerActionContext) {
    const current = await semanticLayerRepository.getById(tenantId, id);
    if (!current) throw new Error("Semantic Layer record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return semanticLayerRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await semanticLayerRepository.getById(tenantId, id);
    if (!record) throw new Error("Semantic Layer record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

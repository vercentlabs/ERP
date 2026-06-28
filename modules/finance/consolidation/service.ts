import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { consolidationRepository } from "./repository";
import { consolidationCreateSchema, consolidationListSchema, consolidationUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ConsolidationActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const consolidationService = {
  async list(input: unknown) {
    return consolidationRepository.list(consolidationListSchema.parse(input));
  },

  async create(input: unknown, context: ConsolidationActionContext) {
    const parsed = consolidationCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return consolidationRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ConsolidationActionContext) {
    const current = await consolidationRepository.getById(tenantId, id);
    if (!current) throw new Error("Consolidation record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return consolidationRepository.update(tenantId, id, consolidationUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ConsolidationActionContext) {
    const current = await consolidationRepository.getById(tenantId, id);
    if (!current) throw new Error("Consolidation record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return consolidationRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await consolidationRepository.getById(tenantId, id);
    if (!record) throw new Error("Consolidation record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

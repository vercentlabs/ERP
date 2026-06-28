import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { leadScoringRepository } from "./repository";
import { leadScoringCreateSchema, leadScoringListSchema, leadScoringUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { LeadScoringActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const leadScoringService = {
  async list(input: unknown) {
    return leadScoringRepository.list(leadScoringListSchema.parse(input));
  },

  async create(input: unknown, context: LeadScoringActionContext) {
    const parsed = leadScoringCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return leadScoringRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: LeadScoringActionContext) {
    const current = await leadScoringRepository.getById(tenantId, id);
    if (!current) throw new Error("Lead Scoring record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return leadScoringRepository.update(tenantId, id, leadScoringUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: LeadScoringActionContext) {
    const current = await leadScoringRepository.getById(tenantId, id);
    if (!current) throw new Error("Lead Scoring record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return leadScoringRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await leadScoringRepository.getById(tenantId, id);
    if (!record) throw new Error("Lead Scoring record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

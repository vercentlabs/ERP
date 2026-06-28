import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { nonprofitRepository } from "./repository";
import { nonprofitCreateSchema, nonprofitListSchema, nonprofitUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { NonprofitActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const nonprofitService = {
  async list(input: unknown) {
    return nonprofitRepository.list(nonprofitListSchema.parse(input));
  },

  async create(input: unknown, context: NonprofitActionContext) {
    const parsed = nonprofitCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return nonprofitRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: NonprofitActionContext) {
    const current = await nonprofitRepository.getById(tenantId, id);
    if (!current) throw new Error("Nonprofit record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return nonprofitRepository.update(tenantId, id, nonprofitUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: NonprofitActionContext) {
    const current = await nonprofitRepository.getById(tenantId, id);
    if (!current) throw new Error("Nonprofit record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return nonprofitRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await nonprofitRepository.getById(tenantId, id);
    if (!record) throw new Error("Nonprofit record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

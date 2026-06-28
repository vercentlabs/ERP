import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { teamsRepository } from "./repository";
import { teamsCreateSchema, teamsListSchema, teamsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { TeamsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const teamsService = {
  async list(input: unknown) {
    return teamsRepository.list(teamsListSchema.parse(input));
  },

  async create(input: unknown, context: TeamsActionContext) {
    const parsed = teamsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return teamsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: TeamsActionContext) {
    const current = await teamsRepository.getById(tenantId, id);
    if (!current) throw new Error("Teams record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return teamsRepository.update(tenantId, id, teamsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: TeamsActionContext) {
    const current = await teamsRepository.getById(tenantId, id);
    if (!current) throw new Error("Teams record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return teamsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await teamsRepository.getById(tenantId, id);
    if (!record) throw new Error("Teams record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

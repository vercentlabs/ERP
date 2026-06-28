import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { commissionsRepository } from "./repository";
import { commissionsCreateSchema, commissionsListSchema, commissionsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CommissionsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const commissionsService = {
  async list(input: unknown) {
    return commissionsRepository.list(commissionsListSchema.parse(input));
  },

  async create(input: unknown, context: CommissionsActionContext) {
    const parsed = commissionsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return commissionsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CommissionsActionContext) {
    const current = await commissionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Commissions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return commissionsRepository.update(tenantId, id, commissionsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CommissionsActionContext) {
    const current = await commissionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Commissions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return commissionsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await commissionsRepository.getById(tenantId, id);
    if (!record) throw new Error("Commissions record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

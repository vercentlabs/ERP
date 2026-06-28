import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { developerPortalRepository } from "./repository";
import { developerPortalCreateSchema, developerPortalListSchema, developerPortalUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DeveloperPortalActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const developerPortalService = {
  async list(input: unknown) {
    return developerPortalRepository.list(developerPortalListSchema.parse(input));
  },

  async create(input: unknown, context: DeveloperPortalActionContext) {
    const parsed = developerPortalCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return developerPortalRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DeveloperPortalActionContext) {
    const current = await developerPortalRepository.getById(tenantId, id);
    if (!current) throw new Error("Developer Portal record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return developerPortalRepository.update(tenantId, id, developerPortalUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DeveloperPortalActionContext) {
    const current = await developerPortalRepository.getById(tenantId, id);
    if (!current) throw new Error("Developer Portal record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return developerPortalRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await developerPortalRepository.getById(tenantId, id);
    if (!record) throw new Error("Developer Portal record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

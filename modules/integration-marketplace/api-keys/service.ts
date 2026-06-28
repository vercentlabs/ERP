import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { apiKeysRepository } from "./repository";
import { apiKeysCreateSchema, apiKeysListSchema, apiKeysUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ApiKeysActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const apiKeysService = {
  async list(input: unknown) {
    return apiKeysRepository.list(apiKeysListSchema.parse(input));
  },

  async create(input: unknown, context: ApiKeysActionContext) {
    const parsed = apiKeysCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return apiKeysRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ApiKeysActionContext) {
    const current = await apiKeysRepository.getById(tenantId, id);
    if (!current) throw new Error("Api Keys record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return apiKeysRepository.update(tenantId, id, apiKeysUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ApiKeysActionContext) {
    const current = await apiKeysRepository.getById(tenantId, id);
    if (!current) throw new Error("Api Keys record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return apiKeysRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await apiKeysRepository.getById(tenantId, id);
    if (!record) throw new Error("Api Keys record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

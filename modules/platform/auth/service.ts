import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { authRepository } from "./repository";
import { authCreateSchema, authListSchema, authUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { AuthActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const authService = {
  async list(input: unknown) {
    return authRepository.list(authListSchema.parse(input));
  },

  async create(input: unknown, context: AuthActionContext) {
    const parsed = authCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return authRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: AuthActionContext) {
    const current = await authRepository.getById(tenantId, id);
    if (!current) throw new Error("Auth record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return authRepository.update(tenantId, id, authUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: AuthActionContext) {
    const current = await authRepository.getById(tenantId, id);
    if (!current) throw new Error("Auth record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return authRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await authRepository.getById(tenantId, id);
    if (!record) throw new Error("Auth record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

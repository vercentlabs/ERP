import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { appBuilderRepository } from "./repository";
import { appBuilderCreateSchema, appBuilderListSchema, appBuilderUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { AppBuilderActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const appBuilderService = {
  async list(input: unknown) {
    return appBuilderRepository.list(appBuilderListSchema.parse(input));
  },

  async create(input: unknown, context: AppBuilderActionContext) {
    const parsed = appBuilderCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return appBuilderRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: AppBuilderActionContext) {
    const current = await appBuilderRepository.getById(tenantId, id);
    if (!current) throw new Error("App Builder record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return appBuilderRepository.update(tenantId, id, appBuilderUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: AppBuilderActionContext) {
    const current = await appBuilderRepository.getById(tenantId, id);
    if (!current) throw new Error("App Builder record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return appBuilderRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await appBuilderRepository.getById(tenantId, id);
    if (!record) throw new Error("App Builder record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

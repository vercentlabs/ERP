import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { assetsRepository } from "./repository";
import { assetsCreateSchema, assetsListSchema, assetsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { AssetsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const assetsService = {
  async list(input: unknown) {
    return assetsRepository.list(assetsListSchema.parse(input));
  },

  async create(input: unknown, context: AssetsActionContext) {
    const parsed = assetsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return assetsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: AssetsActionContext) {
    const current = await assetsRepository.getById(tenantId, id);
    if (!current) throw new Error("Assets record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return assetsRepository.update(tenantId, id, assetsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: AssetsActionContext) {
    const current = await assetsRepository.getById(tenantId, id);
    if (!current) throw new Error("Assets record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return assetsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await assetsRepository.getById(tenantId, id);
    if (!record) throw new Error("Assets record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

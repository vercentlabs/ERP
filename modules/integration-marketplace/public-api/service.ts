import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { publicApiRepository } from "./repository";
import { publicApiCreateSchema, publicApiListSchema, publicApiUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PublicApiActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const publicApiService = {
  async list(input: unknown) {
    return publicApiRepository.list(publicApiListSchema.parse(input));
  },

  async create(input: unknown, context: PublicApiActionContext) {
    const parsed = publicApiCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return publicApiRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PublicApiActionContext) {
    const current = await publicApiRepository.getById(tenantId, id);
    if (!current) throw new Error("Public Api record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return publicApiRepository.update(tenantId, id, publicApiUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PublicApiActionContext) {
    const current = await publicApiRepository.getById(tenantId, id);
    if (!current) throw new Error("Public Api record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return publicApiRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await publicApiRepository.getById(tenantId, id);
    if (!record) throw new Error("Public Api record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

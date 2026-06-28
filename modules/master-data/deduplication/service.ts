import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { deduplicationRepository } from "./repository";
import { deduplicationCreateSchema, deduplicationListSchema, deduplicationUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DeduplicationActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const deduplicationService = {
  async list(input: unknown) {
    return deduplicationRepository.list(deduplicationListSchema.parse(input));
  },

  async create(input: unknown, context: DeduplicationActionContext) {
    const parsed = deduplicationCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return deduplicationRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DeduplicationActionContext) {
    const current = await deduplicationRepository.getById(tenantId, id);
    if (!current) throw new Error("Deduplication record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return deduplicationRepository.update(tenantId, id, deduplicationUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DeduplicationActionContext) {
    const current = await deduplicationRepository.getById(tenantId, id);
    if (!current) throw new Error("Deduplication record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return deduplicationRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await deduplicationRepository.getById(tenantId, id);
    if (!record) throw new Error("Deduplication record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

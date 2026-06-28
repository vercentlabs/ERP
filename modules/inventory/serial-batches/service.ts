import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { serialBatchesRepository } from "./repository";
import { serialBatchesCreateSchema, serialBatchesListSchema, serialBatchesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SerialBatchesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const serialBatchesService = {
  async list(input: unknown) {
    return serialBatchesRepository.list(serialBatchesListSchema.parse(input));
  },

  async create(input: unknown, context: SerialBatchesActionContext) {
    const parsed = serialBatchesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return serialBatchesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SerialBatchesActionContext) {
    const current = await serialBatchesRepository.getById(tenantId, id);
    if (!current) throw new Error("Serial Batches record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return serialBatchesRepository.update(tenantId, id, serialBatchesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SerialBatchesActionContext) {
    const current = await serialBatchesRepository.getById(tenantId, id);
    if (!current) throw new Error("Serial Batches record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return serialBatchesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await serialBatchesRepository.getById(tenantId, id);
    if (!record) throw new Error("Serial Batches record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

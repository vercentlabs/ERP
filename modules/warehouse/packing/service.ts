import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { packingRepository } from "./repository";
import { packingCreateSchema, packingListSchema, packingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PackingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const packingService = {
  async list(input: unknown) {
    return packingRepository.list(packingListSchema.parse(input));
  },

  async create(input: unknown, context: PackingActionContext) {
    const parsed = packingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return packingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PackingActionContext) {
    const current = await packingRepository.getById(tenantId, id);
    if (!current) throw new Error("Packing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return packingRepository.update(tenantId, id, packingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PackingActionContext) {
    const current = await packingRepository.getById(tenantId, id);
    if (!current) throw new Error("Packing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return packingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await packingRepository.getById(tenantId, id);
    if (!record) throw new Error("Packing record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

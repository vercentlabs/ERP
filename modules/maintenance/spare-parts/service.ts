import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { sparePartsRepository } from "./repository";
import { sparePartsCreateSchema, sparePartsListSchema, sparePartsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SparePartsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const sparePartsService = {
  async list(input: unknown) {
    return sparePartsRepository.list(sparePartsListSchema.parse(input));
  },

  async create(input: unknown, context: SparePartsActionContext) {
    const parsed = sparePartsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return sparePartsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SparePartsActionContext) {
    const current = await sparePartsRepository.getById(tenantId, id);
    if (!current) throw new Error("Spare Parts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return sparePartsRepository.update(tenantId, id, sparePartsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SparePartsActionContext) {
    const current = await sparePartsRepository.getById(tenantId, id);
    if (!current) throw new Error("Spare Parts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return sparePartsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await sparePartsRepository.getById(tenantId, id);
    if (!record) throw new Error("Spare Parts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

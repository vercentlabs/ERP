import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { meteredUsageRepository } from "./repository";
import { meteredUsageCreateSchema, meteredUsageListSchema, meteredUsageUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { MeteredUsageActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const meteredUsageService = {
  async list(input: unknown) {
    return meteredUsageRepository.list(meteredUsageListSchema.parse(input));
  },

  async create(input: unknown, context: MeteredUsageActionContext) {
    const parsed = meteredUsageCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return meteredUsageRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: MeteredUsageActionContext) {
    const current = await meteredUsageRepository.getById(tenantId, id);
    if (!current) throw new Error("Metered Usage record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return meteredUsageRepository.update(tenantId, id, meteredUsageUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: MeteredUsageActionContext) {
    const current = await meteredUsageRepository.getById(tenantId, id);
    if (!current) throw new Error("Metered Usage record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return meteredUsageRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await meteredUsageRepository.getById(tenantId, id);
    if (!record) throw new Error("Metered Usage record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

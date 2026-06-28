import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { energyUsageRepository } from "./repository";
import { energyUsageCreateSchema, energyUsageListSchema, energyUsageUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { EnergyUsageActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const energyUsageService = {
  async list(input: unknown) {
    return energyUsageRepository.list(energyUsageListSchema.parse(input));
  },

  async create(input: unknown, context: EnergyUsageActionContext) {
    const parsed = energyUsageCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return energyUsageRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: EnergyUsageActionContext) {
    const current = await energyUsageRepository.getById(tenantId, id);
    if (!current) throw new Error("Energy Usage record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return energyUsageRepository.update(tenantId, id, energyUsageUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: EnergyUsageActionContext) {
    const current = await energyUsageRepository.getById(tenantId, id);
    if (!current) throw new Error("Energy Usage record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return energyUsageRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await energyUsageRepository.getById(tenantId, id);
    if (!record) throw new Error("Energy Usage record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

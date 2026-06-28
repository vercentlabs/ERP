import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { discreteManufacturingRepository } from "./repository";
import { discreteManufacturingCreateSchema, discreteManufacturingListSchema, discreteManufacturingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DiscreteManufacturingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const discreteManufacturingService = {
  async list(input: unknown) {
    return discreteManufacturingRepository.list(discreteManufacturingListSchema.parse(input));
  },

  async create(input: unknown, context: DiscreteManufacturingActionContext) {
    const parsed = discreteManufacturingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return discreteManufacturingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DiscreteManufacturingActionContext) {
    const current = await discreteManufacturingRepository.getById(tenantId, id);
    if (!current) throw new Error("Discrete Manufacturing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return discreteManufacturingRepository.update(tenantId, id, discreteManufacturingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DiscreteManufacturingActionContext) {
    const current = await discreteManufacturingRepository.getById(tenantId, id);
    if (!current) throw new Error("Discrete Manufacturing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return discreteManufacturingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await discreteManufacturingRepository.getById(tenantId, id);
    if (!record) throw new Error("Discrete Manufacturing record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

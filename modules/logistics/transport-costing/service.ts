import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { transportCostingRepository } from "./repository";
import { transportCostingCreateSchema, transportCostingListSchema, transportCostingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { TransportCostingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const transportCostingService = {
  async list(input: unknown) {
    return transportCostingRepository.list(transportCostingListSchema.parse(input));
  },

  async create(input: unknown, context: TransportCostingActionContext) {
    const parsed = transportCostingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return transportCostingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: TransportCostingActionContext) {
    const current = await transportCostingRepository.getById(tenantId, id);
    if (!current) throw new Error("Transport Costing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return transportCostingRepository.update(tenantId, id, transportCostingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: TransportCostingActionContext) {
    const current = await transportCostingRepository.getById(tenantId, id);
    if (!current) throw new Error("Transport Costing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return transportCostingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await transportCostingRepository.getById(tenantId, id);
    if (!record) throw new Error("Transport Costing record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

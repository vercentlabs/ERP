import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { shipmentTrackingRepository } from "./repository";
import { shipmentTrackingCreateSchema, shipmentTrackingListSchema, shipmentTrackingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ShipmentTrackingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const shipmentTrackingService = {
  async list(input: unknown) {
    return shipmentTrackingRepository.list(shipmentTrackingListSchema.parse(input));
  },

  async create(input: unknown, context: ShipmentTrackingActionContext) {
    const parsed = shipmentTrackingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return shipmentTrackingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ShipmentTrackingActionContext) {
    const current = await shipmentTrackingRepository.getById(tenantId, id);
    if (!current) throw new Error("Shipment Tracking record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return shipmentTrackingRepository.update(tenantId, id, shipmentTrackingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ShipmentTrackingActionContext) {
    const current = await shipmentTrackingRepository.getById(tenantId, id);
    if (!current) throw new Error("Shipment Tracking record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return shipmentTrackingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await shipmentTrackingRepository.getById(tenantId, id);
    if (!record) throw new Error("Shipment Tracking record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

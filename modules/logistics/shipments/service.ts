import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { shipmentsRepository } from "./repository";
import { shipmentsCreateSchema, shipmentsListSchema, shipmentsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ShipmentsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const shipmentsService = {
  async list(input: unknown) {
    return shipmentsRepository.list(shipmentsListSchema.parse(input));
  },

  async create(input: unknown, context: ShipmentsActionContext) {
    const parsed = shipmentsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return shipmentsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ShipmentsActionContext) {
    const current = await shipmentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Shipments record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return shipmentsRepository.update(tenantId, id, shipmentsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ShipmentsActionContext) {
    const current = await shipmentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Shipments record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return shipmentsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await shipmentsRepository.getById(tenantId, id);
    if (!record) throw new Error("Shipments record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

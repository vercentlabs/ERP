import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { equipmentRepository } from "./repository";
import { equipmentCreateSchema, equipmentListSchema, equipmentUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { EquipmentActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const equipmentService = {
  async list(input: unknown) {
    return equipmentRepository.list(equipmentListSchema.parse(input));
  },

  async create(input: unknown, context: EquipmentActionContext) {
    const parsed = equipmentCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return equipmentRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: EquipmentActionContext) {
    const current = await equipmentRepository.getById(tenantId, id);
    if (!current) throw new Error("Equipment record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return equipmentRepository.update(tenantId, id, equipmentUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: EquipmentActionContext) {
    const current = await equipmentRepository.getById(tenantId, id);
    if (!current) throw new Error("Equipment record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return equipmentRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await equipmentRepository.getById(tenantId, id);
    if (!record) throw new Error("Equipment record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

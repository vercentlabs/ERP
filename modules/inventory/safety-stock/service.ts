import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { safetyStockRepository } from "./repository";
import { safetyStockCreateSchema, safetyStockListSchema, safetyStockUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SafetyStockActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const safetyStockService = {
  async list(input: unknown) {
    return safetyStockRepository.list(safetyStockListSchema.parse(input));
  },

  async create(input: unknown, context: SafetyStockActionContext) {
    const parsed = safetyStockCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return safetyStockRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SafetyStockActionContext) {
    const current = await safetyStockRepository.getById(tenantId, id);
    if (!current) throw new Error("Safety Stock record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return safetyStockRepository.update(tenantId, id, safetyStockUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SafetyStockActionContext) {
    const current = await safetyStockRepository.getById(tenantId, id);
    if (!current) throw new Error("Safety Stock record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return safetyStockRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await safetyStockRepository.getById(tenantId, id);
    if (!record) throw new Error("Safety Stock record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

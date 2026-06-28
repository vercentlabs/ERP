import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { salesTargetsRepository } from "./repository";
import { salesTargetsCreateSchema, salesTargetsListSchema, salesTargetsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SalesTargetsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const salesTargetsService = {
  async list(input: unknown) {
    return salesTargetsRepository.list(salesTargetsListSchema.parse(input));
  },

  async create(input: unknown, context: SalesTargetsActionContext) {
    const parsed = salesTargetsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return salesTargetsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SalesTargetsActionContext) {
    const current = await salesTargetsRepository.getById(tenantId, id);
    if (!current) throw new Error("Sales Targets record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return salesTargetsRepository.update(tenantId, id, salesTargetsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SalesTargetsActionContext) {
    const current = await salesTargetsRepository.getById(tenantId, id);
    if (!current) throw new Error("Sales Targets record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return salesTargetsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await salesTargetsRepository.getById(tenantId, id);
    if (!record) throw new Error("Sales Targets record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

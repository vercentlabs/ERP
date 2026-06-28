import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { carbonAccountingRepository } from "./repository";
import { carbonAccountingCreateSchema, carbonAccountingListSchema, carbonAccountingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CarbonAccountingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const carbonAccountingService = {
  async list(input: unknown) {
    return carbonAccountingRepository.list(carbonAccountingListSchema.parse(input));
  },

  async create(input: unknown, context: CarbonAccountingActionContext) {
    const parsed = carbonAccountingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return carbonAccountingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CarbonAccountingActionContext) {
    const current = await carbonAccountingRepository.getById(tenantId, id);
    if (!current) throw new Error("Carbon Accounting record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return carbonAccountingRepository.update(tenantId, id, carbonAccountingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CarbonAccountingActionContext) {
    const current = await carbonAccountingRepository.getById(tenantId, id);
    if (!current) throw new Error("Carbon Accounting record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return carbonAccountingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await carbonAccountingRepository.getById(tenantId, id);
    if (!record) throw new Error("Carbon Accounting record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

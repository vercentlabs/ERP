import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { subLedgersRepository } from "./repository";
import { subLedgersCreateSchema, subLedgersListSchema, subLedgersUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SubLedgersActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const subLedgersService = {
  async list(input: unknown) {
    return subLedgersRepository.list(subLedgersListSchema.parse(input));
  },

  async create(input: unknown, context: SubLedgersActionContext) {
    const parsed = subLedgersCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return subLedgersRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SubLedgersActionContext) {
    const current = await subLedgersRepository.getById(tenantId, id);
    if (!current) throw new Error("Sub Ledgers record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return subLedgersRepository.update(tenantId, id, subLedgersUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SubLedgersActionContext) {
    const current = await subLedgersRepository.getById(tenantId, id);
    if (!current) throw new Error("Sub Ledgers record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return subLedgersRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await subLedgersRepository.getById(tenantId, id);
    if (!record) throw new Error("Sub Ledgers record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

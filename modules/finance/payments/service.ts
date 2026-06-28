import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { paymentsRepository } from "./repository";
import { paymentsCreateSchema, paymentsListSchema, paymentsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PaymentsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const paymentsService = {
  async list(input: unknown) {
    return paymentsRepository.list(paymentsListSchema.parse(input));
  },

  async create(input: unknown, context: PaymentsActionContext) {
    const parsed = paymentsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return paymentsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PaymentsActionContext) {
    const current = await paymentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Payments record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return paymentsRepository.update(tenantId, id, paymentsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PaymentsActionContext) {
    const current = await paymentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Payments record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return paymentsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await paymentsRepository.getById(tenantId, id);
    if (!record) throw new Error("Payments record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

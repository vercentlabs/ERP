import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { ticketsRepository } from "./repository";
import { ticketsCreateSchema, ticketsListSchema, ticketsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { TicketsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const ticketsService = {
  async list(input: unknown) {
    return ticketsRepository.list(ticketsListSchema.parse(input));
  },

  async create(input: unknown, context: TicketsActionContext) {
    const parsed = ticketsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return ticketsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: TicketsActionContext) {
    const current = await ticketsRepository.getById(tenantId, id);
    if (!current) throw new Error("Tickets record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return ticketsRepository.update(tenantId, id, ticketsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: TicketsActionContext) {
    const current = await ticketsRepository.getById(tenantId, id);
    if (!current) throw new Error("Tickets record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return ticketsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await ticketsRepository.getById(tenantId, id);
    if (!record) throw new Error("Tickets record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { reservationsRepository } from "./repository";
import { reservationsCreateSchema, reservationsListSchema, reservationsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ReservationsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const reservationsService = {
  async list(input: unknown) {
    return reservationsRepository.list(reservationsListSchema.parse(input));
  },

  async create(input: unknown, context: ReservationsActionContext) {
    const parsed = reservationsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return reservationsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ReservationsActionContext) {
    const current = await reservationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Reservations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return reservationsRepository.update(tenantId, id, reservationsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ReservationsActionContext) {
    const current = await reservationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Reservations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return reservationsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await reservationsRepository.getById(tenantId, id);
    if (!record) throw new Error("Reservations record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

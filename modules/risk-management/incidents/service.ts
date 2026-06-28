import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { incidentsRepository } from "./repository";
import { incidentsCreateSchema, incidentsListSchema, incidentsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { IncidentsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const incidentsService = {
  async list(input: unknown) {
    return incidentsRepository.list(incidentsListSchema.parse(input));
  },

  async create(input: unknown, context: IncidentsActionContext) {
    const parsed = incidentsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return incidentsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: IncidentsActionContext) {
    const current = await incidentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Incidents record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return incidentsRepository.update(tenantId, id, incidentsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: IncidentsActionContext) {
    const current = await incidentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Incidents record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return incidentsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await incidentsRepository.getById(tenantId, id);
    if (!record) throw new Error("Incidents record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

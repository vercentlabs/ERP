import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { fiscalCalendarsRepository } from "./repository";
import { fiscalCalendarsCreateSchema, fiscalCalendarsListSchema, fiscalCalendarsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { FiscalCalendarsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const fiscalCalendarsService = {
  async list(input: unknown) {
    return fiscalCalendarsRepository.list(fiscalCalendarsListSchema.parse(input));
  },

  async create(input: unknown, context: FiscalCalendarsActionContext) {
    const parsed = fiscalCalendarsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return fiscalCalendarsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: FiscalCalendarsActionContext) {
    const current = await fiscalCalendarsRepository.getById(tenantId, id);
    if (!current) throw new Error("Fiscal Calendars record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return fiscalCalendarsRepository.update(tenantId, id, fiscalCalendarsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: FiscalCalendarsActionContext) {
    const current = await fiscalCalendarsRepository.getById(tenantId, id);
    if (!current) throw new Error("Fiscal Calendars record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return fiscalCalendarsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await fiscalCalendarsRepository.getById(tenantId, id);
    if (!record) throw new Error("Fiscal Calendars record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

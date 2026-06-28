import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { fiscalYearsRepository } from "./repository";
import { fiscalYearsCreateSchema, fiscalYearsListSchema, fiscalYearsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { FiscalYearsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const fiscalYearsService = {
  async list(input: unknown) {
    return fiscalYearsRepository.list(fiscalYearsListSchema.parse(input));
  },

  async create(input: unknown, context: FiscalYearsActionContext) {
    const parsed = fiscalYearsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return fiscalYearsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: FiscalYearsActionContext) {
    const current = await fiscalYearsRepository.getById(tenantId, id);
    if (!current) throw new Error("Fiscal Years record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return fiscalYearsRepository.update(tenantId, id, fiscalYearsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: FiscalYearsActionContext) {
    const current = await fiscalYearsRepository.getById(tenantId, id);
    if (!current) throw new Error("Fiscal Years record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return fiscalYearsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await fiscalYearsRepository.getById(tenantId, id);
    if (!record) throw new Error("Fiscal Years record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

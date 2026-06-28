import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { taxComplianceRepository } from "./repository";
import { taxComplianceCreateSchema, taxComplianceListSchema, taxComplianceUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { TaxComplianceActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const taxComplianceService = {
  async list(input: unknown) {
    return taxComplianceRepository.list(taxComplianceListSchema.parse(input));
  },

  async create(input: unknown, context: TaxComplianceActionContext) {
    const parsed = taxComplianceCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return taxComplianceRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: TaxComplianceActionContext) {
    const current = await taxComplianceRepository.getById(tenantId, id);
    if (!current) throw new Error("Tax Compliance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return taxComplianceRepository.update(tenantId, id, taxComplianceUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: TaxComplianceActionContext) {
    const current = await taxComplianceRepository.getById(tenantId, id);
    if (!current) throw new Error("Tax Compliance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return taxComplianceRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await taxComplianceRepository.getById(tenantId, id);
    if (!record) throw new Error("Tax Compliance record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

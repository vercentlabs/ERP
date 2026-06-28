import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { complianceDisclosuresRepository } from "./repository";
import { complianceDisclosuresCreateSchema, complianceDisclosuresListSchema, complianceDisclosuresUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ComplianceDisclosuresActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const complianceDisclosuresService = {
  async list(input: unknown) {
    return complianceDisclosuresRepository.list(complianceDisclosuresListSchema.parse(input));
  },

  async create(input: unknown, context: ComplianceDisclosuresActionContext) {
    const parsed = complianceDisclosuresCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return complianceDisclosuresRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ComplianceDisclosuresActionContext) {
    const current = await complianceDisclosuresRepository.getById(tenantId, id);
    if (!current) throw new Error("Compliance Disclosures record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return complianceDisclosuresRepository.update(tenantId, id, complianceDisclosuresUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ComplianceDisclosuresActionContext) {
    const current = await complianceDisclosuresRepository.getById(tenantId, id);
    if (!current) throw new Error("Compliance Disclosures record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return complianceDisclosuresRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await complianceDisclosuresRepository.getById(tenantId, id);
    if (!record) throw new Error("Compliance Disclosures record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

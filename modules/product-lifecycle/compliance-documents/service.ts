import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { complianceDocumentsRepository } from "./repository";
import { complianceDocumentsCreateSchema, complianceDocumentsListSchema, complianceDocumentsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ComplianceDocumentsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const complianceDocumentsService = {
  async list(input: unknown) {
    return complianceDocumentsRepository.list(complianceDocumentsListSchema.parse(input));
  },

  async create(input: unknown, context: ComplianceDocumentsActionContext) {
    const parsed = complianceDocumentsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return complianceDocumentsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ComplianceDocumentsActionContext) {
    const current = await complianceDocumentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Compliance Documents record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return complianceDocumentsRepository.update(tenantId, id, complianceDocumentsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ComplianceDocumentsActionContext) {
    const current = await complianceDocumentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Compliance Documents record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return complianceDocumentsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await complianceDocumentsRepository.getById(tenantId, id);
    if (!record) throw new Error("Compliance Documents record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

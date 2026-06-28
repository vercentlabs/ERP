import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { certificationsRepository } from "./repository";
import { certificationsCreateSchema, certificationsListSchema, certificationsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CertificationsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const certificationsService = {
  async list(input: unknown) {
    return certificationsRepository.list(certificationsListSchema.parse(input));
  },

  async create(input: unknown, context: CertificationsActionContext) {
    const parsed = certificationsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return certificationsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CertificationsActionContext) {
    const current = await certificationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Certifications record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return certificationsRepository.update(tenantId, id, certificationsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CertificationsActionContext) {
    const current = await certificationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Certifications record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return certificationsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await certificationsRepository.getById(tenantId, id);
    if (!record) throw new Error("Certifications record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { qualityCertificatesRepository } from "./repository";
import { qualityCertificatesCreateSchema, qualityCertificatesListSchema, qualityCertificatesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { QualityCertificatesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const qualityCertificatesService = {
  async list(input: unknown) {
    return qualityCertificatesRepository.list(qualityCertificatesListSchema.parse(input));
  },

  async create(input: unknown, context: QualityCertificatesActionContext) {
    const parsed = qualityCertificatesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return qualityCertificatesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: QualityCertificatesActionContext) {
    const current = await qualityCertificatesRepository.getById(tenantId, id);
    if (!current) throw new Error("Quality Certificates record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return qualityCertificatesRepository.update(tenantId, id, qualityCertificatesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: QualityCertificatesActionContext) {
    const current = await qualityCertificatesRepository.getById(tenantId, id);
    if (!current) throw new Error("Quality Certificates record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return qualityCertificatesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await qualityCertificatesRepository.getById(tenantId, id);
    if (!record) throw new Error("Quality Certificates record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

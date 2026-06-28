import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { auditLogsRepository } from "./repository";
import { auditLogsCreateSchema, auditLogsListSchema, auditLogsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { AuditLogsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const auditLogsService = {
  async list(input: unknown) {
    return auditLogsRepository.list(auditLogsListSchema.parse(input));
  },

  async create(input: unknown, context: AuditLogsActionContext) {
    const parsed = auditLogsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return auditLogsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: AuditLogsActionContext) {
    const current = await auditLogsRepository.getById(tenantId, id);
    if (!current) throw new Error("Audit Logs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return auditLogsRepository.update(tenantId, id, auditLogsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: AuditLogsActionContext) {
    const current = await auditLogsRepository.getById(tenantId, id);
    if (!current) throw new Error("Audit Logs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return auditLogsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await auditLogsRepository.getById(tenantId, id);
    if (!record) throw new Error("Audit Logs record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

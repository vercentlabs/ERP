import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { approvalsAuditRepository } from "./repository";
import { approvalsAuditCreateSchema, approvalsAuditListSchema, approvalsAuditUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ApprovalsAuditActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const approvalsAuditService = {
  async list(input: unknown) {
    return approvalsAuditRepository.list(approvalsAuditListSchema.parse(input));
  },

  async create(input: unknown, context: ApprovalsAuditActionContext) {
    const parsed = approvalsAuditCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return approvalsAuditRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ApprovalsAuditActionContext) {
    const current = await approvalsAuditRepository.getById(tenantId, id);
    if (!current) throw new Error("Approvals Audit record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return approvalsAuditRepository.update(tenantId, id, approvalsAuditUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ApprovalsAuditActionContext) {
    const current = await approvalsAuditRepository.getById(tenantId, id);
    if (!current) throw new Error("Approvals Audit record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return approvalsAuditRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await approvalsAuditRepository.getById(tenantId, id);
    if (!record) throw new Error("Approvals Audit record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

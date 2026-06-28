import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { workflowApprovalsRepository } from "./repository";
import { workflowApprovalsCreateSchema, workflowApprovalsListSchema, workflowApprovalsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { WorkflowApprovalsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const workflowApprovalsService = {
  async list(input: unknown) {
    return workflowApprovalsRepository.list(workflowApprovalsListSchema.parse(input));
  },

  async create(input: unknown, context: WorkflowApprovalsActionContext) {
    const parsed = workflowApprovalsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return workflowApprovalsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: WorkflowApprovalsActionContext) {
    const current = await workflowApprovalsRepository.getById(tenantId, id);
    if (!current) throw new Error("Workflow Approvals record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return workflowApprovalsRepository.update(tenantId, id, workflowApprovalsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: WorkflowApprovalsActionContext) {
    const current = await workflowApprovalsRepository.getById(tenantId, id);
    if (!current) throw new Error("Workflow Approvals record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return workflowApprovalsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await workflowApprovalsRepository.getById(tenantId, id);
    if (!record) throw new Error("Workflow Approvals record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

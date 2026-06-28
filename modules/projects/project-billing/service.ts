import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { projectBillingRepository } from "./repository";
import { projectBillingCreateSchema, projectBillingListSchema, projectBillingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProjectBillingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const projectBillingService = {
  async list(input: unknown) {
    return projectBillingRepository.list(projectBillingListSchema.parse(input));
  },

  async create(input: unknown, context: ProjectBillingActionContext) {
    const parsed = projectBillingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return projectBillingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProjectBillingActionContext) {
    const current = await projectBillingRepository.getById(tenantId, id);
    if (!current) throw new Error("Project Billing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return projectBillingRepository.update(tenantId, id, projectBillingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProjectBillingActionContext) {
    const current = await projectBillingRepository.getById(tenantId, id);
    if (!current) throw new Error("Project Billing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return projectBillingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await projectBillingRepository.getById(tenantId, id);
    if (!record) throw new Error("Project Billing record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

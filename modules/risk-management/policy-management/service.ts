import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { policyManagementRepository } from "./repository";
import { policyManagementCreateSchema, policyManagementListSchema, policyManagementUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { PolicyManagementActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const policyManagementService = {
  async list(input: unknown) {
    return policyManagementRepository.list(policyManagementListSchema.parse(input));
  },

  async create(input: unknown, context: PolicyManagementActionContext) {
    const parsed = policyManagementCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return policyManagementRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: PolicyManagementActionContext) {
    const current = await policyManagementRepository.getById(tenantId, id);
    if (!current) throw new Error("Policy Management record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return policyManagementRepository.update(tenantId, id, policyManagementUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: PolicyManagementActionContext) {
    const current = await policyManagementRepository.getById(tenantId, id);
    if (!current) throw new Error("Policy Management record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return policyManagementRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await policyManagementRepository.getById(tenantId, id);
    if (!record) throw new Error("Policy Management record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

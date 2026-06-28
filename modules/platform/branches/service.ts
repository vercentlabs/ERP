import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { branchesRepository } from "./repository";
import { branchesCreateSchema, branchesListSchema, branchesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { BranchesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const branchesService = {
  async list(input: unknown) {
    return branchesRepository.list(branchesListSchema.parse(input));
  },

  async create(input: unknown, context: BranchesActionContext) {
    const parsed = branchesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return branchesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: BranchesActionContext) {
    const current = await branchesRepository.getById(tenantId, id);
    if (!current) throw new Error("Branches record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return branchesRepository.update(tenantId, id, branchesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: BranchesActionContext) {
    const current = await branchesRepository.getById(tenantId, id);
    if (!current) throw new Error("Branches record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return branchesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await branchesRepository.getById(tenantId, id);
    if (!record) throw new Error("Branches record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { contractsRepository } from "./repository";
import { contractsCreateSchema, contractsListSchema, contractsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ContractsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const contractsService = {
  async list(input: unknown) {
    return contractsRepository.list(contractsListSchema.parse(input));
  },

  async create(input: unknown, context: ContractsActionContext) {
    const parsed = contractsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return contractsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ContractsActionContext) {
    const current = await contractsRepository.getById(tenantId, id);
    if (!current) throw new Error("Contracts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return contractsRepository.update(tenantId, id, contractsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ContractsActionContext) {
    const current = await contractsRepository.getById(tenantId, id);
    if (!current) throw new Error("Contracts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return contractsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await contractsRepository.getById(tenantId, id);
    if (!record) throw new Error("Contracts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { dataGovernanceRepository } from "./repository";
import { dataGovernanceCreateSchema, dataGovernanceListSchema, dataGovernanceUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DataGovernanceActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const dataGovernanceService = {
  async list(input: unknown) {
    return dataGovernanceRepository.list(dataGovernanceListSchema.parse(input));
  },

  async create(input: unknown, context: DataGovernanceActionContext) {
    const parsed = dataGovernanceCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return dataGovernanceRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DataGovernanceActionContext) {
    const current = await dataGovernanceRepository.getById(tenantId, id);
    if (!current) throw new Error("Data Governance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return dataGovernanceRepository.update(tenantId, id, dataGovernanceUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DataGovernanceActionContext) {
    const current = await dataGovernanceRepository.getById(tenantId, id);
    if (!current) throw new Error("Data Governance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return dataGovernanceRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await dataGovernanceRepository.getById(tenantId, id);
    if (!record) throw new Error("Data Governance record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

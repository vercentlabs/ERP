import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { dataRetentionRepository } from "./repository";
import { dataRetentionCreateSchema, dataRetentionListSchema, dataRetentionUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DataRetentionActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const dataRetentionService = {
  async list(input: unknown) {
    return dataRetentionRepository.list(dataRetentionListSchema.parse(input));
  },

  async create(input: unknown, context: DataRetentionActionContext) {
    const parsed = dataRetentionCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return dataRetentionRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DataRetentionActionContext) {
    const current = await dataRetentionRepository.getById(tenantId, id);
    if (!current) throw new Error("Data Retention record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return dataRetentionRepository.update(tenantId, id, dataRetentionUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DataRetentionActionContext) {
    const current = await dataRetentionRepository.getById(tenantId, id);
    if (!current) throw new Error("Data Retention record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return dataRetentionRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await dataRetentionRepository.getById(tenantId, id);
    if (!record) throw new Error("Data Retention record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { dataQualityRepository } from "./repository";
import { dataQualityCreateSchema, dataQualityListSchema, dataQualityUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DataQualityActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const dataQualityService = {
  async list(input: unknown) {
    return dataQualityRepository.list(dataQualityListSchema.parse(input));
  },

  async create(input: unknown, context: DataQualityActionContext) {
    const parsed = dataQualityCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return dataQualityRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DataQualityActionContext) {
    const current = await dataQualityRepository.getById(tenantId, id);
    if (!current) throw new Error("Data Quality record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return dataQualityRepository.update(tenantId, id, dataQualityUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DataQualityActionContext) {
    const current = await dataQualityRepository.getById(tenantId, id);
    if (!current) throw new Error("Data Quality record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return dataQualityRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await dataQualityRepository.getById(tenantId, id);
    if (!record) throw new Error("Data Quality record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

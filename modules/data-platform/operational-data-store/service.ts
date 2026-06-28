import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { operationalDataStoreRepository } from "./repository";
import { operationalDataStoreCreateSchema, operationalDataStoreListSchema, operationalDataStoreUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { OperationalDataStoreActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const operationalDataStoreService = {
  async list(input: unknown) {
    return operationalDataStoreRepository.list(operationalDataStoreListSchema.parse(input));
  },

  async create(input: unknown, context: OperationalDataStoreActionContext) {
    const parsed = operationalDataStoreCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return operationalDataStoreRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: OperationalDataStoreActionContext) {
    const current = await operationalDataStoreRepository.getById(tenantId, id);
    if (!current) throw new Error("Operational Data Store record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return operationalDataStoreRepository.update(tenantId, id, operationalDataStoreUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: OperationalDataStoreActionContext) {
    const current = await operationalDataStoreRepository.getById(tenantId, id);
    if (!current) throw new Error("Operational Data Store record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return operationalDataStoreRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await operationalDataStoreRepository.getById(tenantId, id);
    if (!record) throw new Error("Operational Data Store record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { anomalyDetectionRepository } from "./repository";
import { anomalyDetectionCreateSchema, anomalyDetectionListSchema, anomalyDetectionUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { AnomalyDetectionActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const anomalyDetectionService = {
  async list(input: unknown) {
    return anomalyDetectionRepository.list(anomalyDetectionListSchema.parse(input));
  },

  async create(input: unknown, context: AnomalyDetectionActionContext) {
    const parsed = anomalyDetectionCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return anomalyDetectionRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: AnomalyDetectionActionContext) {
    const current = await anomalyDetectionRepository.getById(tenantId, id);
    if (!current) throw new Error("Anomaly Detection record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return anomalyDetectionRepository.update(tenantId, id, anomalyDetectionUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: AnomalyDetectionActionContext) {
    const current = await anomalyDetectionRepository.getById(tenantId, id);
    if (!current) throw new Error("Anomaly Detection record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return anomalyDetectionRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await anomalyDetectionRepository.getById(tenantId, id);
    if (!record) throw new Error("Anomaly Detection record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { inspectionPlansRepository } from "./repository";
import { inspectionPlansCreateSchema, inspectionPlansListSchema, inspectionPlansUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { InspectionPlansActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const inspectionPlansService = {
  async list(input: unknown) {
    return inspectionPlansRepository.list(inspectionPlansListSchema.parse(input));
  },

  async create(input: unknown, context: InspectionPlansActionContext) {
    const parsed = inspectionPlansCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return inspectionPlansRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: InspectionPlansActionContext) {
    const current = await inspectionPlansRepository.getById(tenantId, id);
    if (!current) throw new Error("Inspection Plans record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return inspectionPlansRepository.update(tenantId, id, inspectionPlansUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: InspectionPlansActionContext) {
    const current = await inspectionPlansRepository.getById(tenantId, id);
    if (!current) throw new Error("Inspection Plans record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return inspectionPlansRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await inspectionPlansRepository.getById(tenantId, id);
    if (!record) throw new Error("Inspection Plans record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

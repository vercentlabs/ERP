import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { healthcareRepository } from "./repository";
import { healthcareCreateSchema, healthcareListSchema, healthcareUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { HealthcareActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const healthcareService = {
  async list(input: unknown) {
    return healthcareRepository.list(healthcareListSchema.parse(input));
  },

  async create(input: unknown, context: HealthcareActionContext) {
    const parsed = healthcareCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return healthcareRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: HealthcareActionContext) {
    const current = await healthcareRepository.getById(tenantId, id);
    if (!current) throw new Error("Healthcare record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return healthcareRepository.update(tenantId, id, healthcareUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: HealthcareActionContext) {
    const current = await healthcareRepository.getById(tenantId, id);
    if (!current) throw new Error("Healthcare record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return healthcareRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await healthcareRepository.getById(tenantId, id);
    if (!record) throw new Error("Healthcare record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { statutoryReportsRepository } from "./repository";
import { statutoryReportsCreateSchema, statutoryReportsListSchema, statutoryReportsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { StatutoryReportsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const statutoryReportsService = {
  async list(input: unknown) {
    return statutoryReportsRepository.list(statutoryReportsListSchema.parse(input));
  },

  async create(input: unknown, context: StatutoryReportsActionContext) {
    const parsed = statutoryReportsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return statutoryReportsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: StatutoryReportsActionContext) {
    const current = await statutoryReportsRepository.getById(tenantId, id);
    if (!current) throw new Error("Statutory Reports record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return statutoryReportsRepository.update(tenantId, id, statutoryReportsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: StatutoryReportsActionContext) {
    const current = await statutoryReportsRepository.getById(tenantId, id);
    if (!current) throw new Error("Statutory Reports record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return statutoryReportsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await statutoryReportsRepository.getById(tenantId, id);
    if (!record) throw new Error("Statutory Reports record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

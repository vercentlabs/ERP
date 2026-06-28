import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { managementReportingRepository } from "./repository";
import { managementReportingCreateSchema, managementReportingListSchema, managementReportingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ManagementReportingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const managementReportingService = {
  async list(input: unknown) {
    return managementReportingRepository.list(managementReportingListSchema.parse(input));
  },

  async create(input: unknown, context: ManagementReportingActionContext) {
    const parsed = managementReportingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return managementReportingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ManagementReportingActionContext) {
    const current = await managementReportingRepository.getById(tenantId, id);
    if (!current) throw new Error("Management Reporting record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return managementReportingRepository.update(tenantId, id, managementReportingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ManagementReportingActionContext) {
    const current = await managementReportingRepository.getById(tenantId, id);
    if (!current) throw new Error("Management Reporting record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return managementReportingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await managementReportingRepository.getById(tenantId, id);
    if (!record) throw new Error("Management Reporting record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

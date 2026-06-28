import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { reportBuilderRepository } from "./repository";
import { reportBuilderCreateSchema, reportBuilderListSchema, reportBuilderUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ReportBuilderActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const reportBuilderService = {
  async list(input: unknown) {
    return reportBuilderRepository.list(reportBuilderListSchema.parse(input));
  },

  async create(input: unknown, context: ReportBuilderActionContext) {
    const parsed = reportBuilderCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return reportBuilderRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ReportBuilderActionContext) {
    const current = await reportBuilderRepository.getById(tenantId, id);
    if (!current) throw new Error("Report Builder record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return reportBuilderRepository.update(tenantId, id, reportBuilderUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ReportBuilderActionContext) {
    const current = await reportBuilderRepository.getById(tenantId, id);
    if (!current) throw new Error("Report Builder record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return reportBuilderRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await reportBuilderRepository.getById(tenantId, id);
    if (!record) throw new Error("Report Builder record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

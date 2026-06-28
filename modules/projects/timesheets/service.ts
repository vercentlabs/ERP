import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { timesheetsRepository } from "./repository";
import { timesheetsCreateSchema, timesheetsListSchema, timesheetsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { TimesheetsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const timesheetsService = {
  async list(input: unknown) {
    return timesheetsRepository.list(timesheetsListSchema.parse(input));
  },

  async create(input: unknown, context: TimesheetsActionContext) {
    const parsed = timesheetsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return timesheetsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: TimesheetsActionContext) {
    const current = await timesheetsRepository.getById(tenantId, id);
    if (!current) throw new Error("Timesheets record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return timesheetsRepository.update(tenantId, id, timesheetsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: TimesheetsActionContext) {
    const current = await timesheetsRepository.getById(tenantId, id);
    if (!current) throw new Error("Timesheets record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return timesheetsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await timesheetsRepository.getById(tenantId, id);
    if (!record) throw new Error("Timesheets record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

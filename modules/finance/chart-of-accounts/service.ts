import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { chartOfAccountsRepository } from "./repository";
import { chartOfAccountsCreateSchema, chartOfAccountsListSchema, chartOfAccountsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ChartOfAccountsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const chartOfAccountsService = {
  async list(input: unknown) {
    return chartOfAccountsRepository.list(chartOfAccountsListSchema.parse(input));
  },

  async create(input: unknown, context: ChartOfAccountsActionContext) {
    const parsed = chartOfAccountsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return chartOfAccountsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ChartOfAccountsActionContext) {
    const current = await chartOfAccountsRepository.getById(tenantId, id);
    if (!current) throw new Error("Chart Of Accounts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return chartOfAccountsRepository.update(tenantId, id, chartOfAccountsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ChartOfAccountsActionContext) {
    const current = await chartOfAccountsRepository.getById(tenantId, id);
    if (!current) throw new Error("Chart Of Accounts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return chartOfAccountsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await chartOfAccountsRepository.getById(tenantId, id);
    if (!record) throw new Error("Chart Of Accounts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

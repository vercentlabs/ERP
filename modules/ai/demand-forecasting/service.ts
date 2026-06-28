import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { demandForecastingRepository } from "./repository";
import { demandForecastingCreateSchema, demandForecastingListSchema, demandForecastingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DemandForecastingActionContext, DemandForecastingCreateInput, DemandForecastingListRequest, DemandForecastingUpdateInput } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const demandForecastingService = {
  async list(input: unknown) {
    const parsed = demandForecastingListSchema.parse(input) as DemandForecastingListRequest;
    return demandForecastingRepository.list(parsed);
  },

  async create(input: unknown, context: DemandForecastingActionContext) {
    const parsed = demandForecastingCreateSchema.parse(input) as DemandForecastingCreateInput;
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return demandForecastingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DemandForecastingActionContext) {
    const current = await demandForecastingRepository.getById(tenantId, id);
    if (!current) throw new Error("Demand Forecasting record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    const parsed = demandForecastingUpdateSchema.parse(input) as DemandForecastingUpdateInput;
    return demandForecastingRepository.update(tenantId, id, parsed, context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DemandForecastingActionContext) {
    const current = await demandForecastingRepository.getById(tenantId, id);
    if (!current) throw new Error("Demand Forecasting record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return demandForecastingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await demandForecastingRepository.getById(tenantId, id);
    if (!record) throw new Error("Demand Forecasting record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

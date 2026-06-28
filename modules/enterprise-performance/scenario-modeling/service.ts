import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { scenarioModelingRepository } from "./repository";
import { scenarioModelingCreateSchema, scenarioModelingListSchema, scenarioModelingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ScenarioModelingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const scenarioModelingService = {
  async list(input: unknown) {
    return scenarioModelingRepository.list(scenarioModelingListSchema.parse(input));
  },

  async create(input: unknown, context: ScenarioModelingActionContext) {
    const parsed = scenarioModelingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return scenarioModelingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ScenarioModelingActionContext) {
    const current = await scenarioModelingRepository.getById(tenantId, id);
    if (!current) throw new Error("Scenario Modeling record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return scenarioModelingRepository.update(tenantId, id, scenarioModelingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ScenarioModelingActionContext) {
    const current = await scenarioModelingRepository.getById(tenantId, id);
    if (!current) throw new Error("Scenario Modeling record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return scenarioModelingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await scenarioModelingRepository.getById(tenantId, id);
    if (!record) throw new Error("Scenario Modeling record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

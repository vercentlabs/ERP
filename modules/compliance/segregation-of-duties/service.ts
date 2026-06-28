import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { segregationOfDutiesRepository } from "./repository";
import { segregationOfDutiesCreateSchema, segregationOfDutiesListSchema, segregationOfDutiesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SegregationOfDutiesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const segregationOfDutiesService = {
  async list(input: unknown) {
    return segregationOfDutiesRepository.list(segregationOfDutiesListSchema.parse(input));
  },

  async create(input: unknown, context: SegregationOfDutiesActionContext) {
    const parsed = segregationOfDutiesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return segregationOfDutiesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SegregationOfDutiesActionContext) {
    const current = await segregationOfDutiesRepository.getById(tenantId, id);
    if (!current) throw new Error("Segregation Of Duties record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return segregationOfDutiesRepository.update(tenantId, id, segregationOfDutiesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SegregationOfDutiesActionContext) {
    const current = await segregationOfDutiesRepository.getById(tenantId, id);
    if (!current) throw new Error("Segregation Of Duties record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return segregationOfDutiesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await segregationOfDutiesRepository.getById(tenantId, id);
    if (!record) throw new Error("Segregation Of Duties record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

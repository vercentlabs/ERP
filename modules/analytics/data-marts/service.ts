import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { dataMartsRepository } from "./repository";
import { dataMartsCreateSchema, dataMartsListSchema, dataMartsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DataMartsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const dataMartsService = {
  async list(input: unknown) {
    return dataMartsRepository.list(dataMartsListSchema.parse(input));
  },

  async create(input: unknown, context: DataMartsActionContext) {
    const parsed = dataMartsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return dataMartsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DataMartsActionContext) {
    const current = await dataMartsRepository.getById(tenantId, id);
    if (!current) throw new Error("Data Marts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return dataMartsRepository.update(tenantId, id, dataMartsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DataMartsActionContext) {
    const current = await dataMartsRepository.getById(tenantId, id);
    if (!current) throw new Error("Data Marts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return dataMartsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await dataMartsRepository.getById(tenantId, id);
    if (!record) throw new Error("Data Marts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

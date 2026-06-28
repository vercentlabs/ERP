import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { dunningRepository } from "./repository";
import { dunningCreateSchema, dunningListSchema, dunningUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DunningActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const dunningService = {
  async list(input: unknown) {
    return dunningRepository.list(dunningListSchema.parse(input));
  },

  async create(input: unknown, context: DunningActionContext) {
    const parsed = dunningCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return dunningRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DunningActionContext) {
    const current = await dunningRepository.getById(tenantId, id);
    if (!current) throw new Error("Dunning record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return dunningRepository.update(tenantId, id, dunningUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DunningActionContext) {
    const current = await dunningRepository.getById(tenantId, id);
    if (!current) throw new Error("Dunning record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return dunningRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await dunningRepository.getById(tenantId, id);
    if (!record) throw new Error("Dunning record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { binsRepository } from "./repository";
import { binsCreateSchema, binsListSchema, binsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { BinsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const binsService = {
  async list(input: unknown) {
    return binsRepository.list(binsListSchema.parse(input));
  },

  async create(input: unknown, context: BinsActionContext) {
    const parsed = binsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return binsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: BinsActionContext) {
    const current = await binsRepository.getById(tenantId, id);
    if (!current) throw new Error("Bins record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return binsRepository.update(tenantId, id, binsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: BinsActionContext) {
    const current = await binsRepository.getById(tenantId, id);
    if (!current) throw new Error("Bins record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return binsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await binsRepository.getById(tenantId, id);
    if (!record) throw new Error("Bins record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { blanketOrdersRepository } from "./repository";
import { blanketOrdersCreateSchema, blanketOrdersListSchema, blanketOrdersUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { BlanketOrdersActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const blanketOrdersService = {
  async list(input: unknown) {
    return blanketOrdersRepository.list(blanketOrdersListSchema.parse(input));
  },

  async create(input: unknown, context: BlanketOrdersActionContext) {
    const parsed = blanketOrdersCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return blanketOrdersRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: BlanketOrdersActionContext) {
    const current = await blanketOrdersRepository.getById(tenantId, id);
    if (!current) throw new Error("Blanket Orders record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return blanketOrdersRepository.update(tenantId, id, blanketOrdersUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: BlanketOrdersActionContext) {
    const current = await blanketOrdersRepository.getById(tenantId, id);
    if (!current) throw new Error("Blanket Orders record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return blanketOrdersRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await blanketOrdersRepository.getById(tenantId, id);
    if (!record) throw new Error("Blanket Orders record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

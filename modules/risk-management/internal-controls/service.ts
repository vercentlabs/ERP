import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { internalControlsRepository } from "./repository";
import { internalControlsCreateSchema, internalControlsListSchema, internalControlsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { InternalControlsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const internalControlsService = {
  async list(input: unknown) {
    return internalControlsRepository.list(internalControlsListSchema.parse(input));
  },

  async create(input: unknown, context: InternalControlsActionContext) {
    const parsed = internalControlsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return internalControlsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: InternalControlsActionContext) {
    const current = await internalControlsRepository.getById(tenantId, id);
    if (!current) throw new Error("Internal Controls record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return internalControlsRepository.update(tenantId, id, internalControlsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: InternalControlsActionContext) {
    const current = await internalControlsRepository.getById(tenantId, id);
    if (!current) throw new Error("Internal Controls record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return internalControlsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await internalControlsRepository.getById(tenantId, id);
    if (!record) throw new Error("Internal Controls record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

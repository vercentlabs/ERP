import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { dispatchRepository } from "./repository";
import { dispatchCreateSchema, dispatchListSchema, dispatchUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DispatchActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const dispatchService = {
  async list(input: unknown) {
    return dispatchRepository.list(dispatchListSchema.parse(input));
  },

  async create(input: unknown, context: DispatchActionContext) {
    const parsed = dispatchCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return dispatchRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DispatchActionContext) {
    const current = await dispatchRepository.getById(tenantId, id);
    if (!current) throw new Error("Dispatch record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return dispatchRepository.update(tenantId, id, dispatchUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DispatchActionContext) {
    const current = await dispatchRepository.getById(tenantId, id);
    if (!current) throw new Error("Dispatch record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return dispatchRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await dispatchRepository.getById(tenantId, id);
    if (!record) throw new Error("Dispatch record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

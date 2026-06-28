import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { renewalsRepository } from "./repository";
import { renewalsCreateSchema, renewalsListSchema, renewalsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { RenewalsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const renewalsService = {
  async list(input: unknown) {
    return renewalsRepository.list(renewalsListSchema.parse(input));
  },

  async create(input: unknown, context: RenewalsActionContext) {
    const parsed = renewalsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return renewalsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: RenewalsActionContext) {
    const current = await renewalsRepository.getById(tenantId, id);
    if (!current) throw new Error("Renewals record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return renewalsRepository.update(tenantId, id, renewalsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: RenewalsActionContext) {
    const current = await renewalsRepository.getById(tenantId, id);
    if (!current) throw new Error("Renewals record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return renewalsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await renewalsRepository.getById(tenantId, id);
    if (!record) throw new Error("Renewals record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

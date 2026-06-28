import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { slasRepository } from "./repository";
import { slasCreateSchema, slasListSchema, slasUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SlasActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const slasService = {
  async list(input: unknown) {
    return slasRepository.list(slasListSchema.parse(input));
  },

  async create(input: unknown, context: SlasActionContext) {
    const parsed = slasCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return slasRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SlasActionContext) {
    const current = await slasRepository.getById(tenantId, id);
    if (!current) throw new Error("Slas record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return slasRepository.update(tenantId, id, slasUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SlasActionContext) {
    const current = await slasRepository.getById(tenantId, id);
    if (!current) throw new Error("Slas record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return slasRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await slasRepository.getById(tenantId, id);
    if (!record) throw new Error("Slas record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

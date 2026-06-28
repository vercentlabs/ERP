import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { apparelRepository } from "./repository";
import { apparelCreateSchema, apparelListSchema, apparelUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ApparelActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const apparelService = {
  async list(input: unknown) {
    return apparelRepository.list(apparelListSchema.parse(input));
  },

  async create(input: unknown, context: ApparelActionContext) {
    const parsed = apparelCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return apparelRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ApparelActionContext) {
    const current = await apparelRepository.getById(tenantId, id);
    if (!current) throw new Error("Apparel record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return apparelRepository.update(tenantId, id, apparelUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ApparelActionContext) {
    const current = await apparelRepository.getById(tenantId, id);
    if (!current) throw new Error("Apparel record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return apparelRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await apparelRepository.getById(tenantId, id);
    if (!record) throw new Error("Apparel record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

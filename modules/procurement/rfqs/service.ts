import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { rfqsRepository } from "./repository";
import { rfqsCreateSchema, rfqsListSchema, rfqsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { RfqsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const rfqsService = {
  async list(input: unknown) {
    return rfqsRepository.list(rfqsListSchema.parse(input));
  },

  async create(input: unknown, context: RfqsActionContext) {
    const parsed = rfqsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return rfqsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: RfqsActionContext) {
    const current = await rfqsRepository.getById(tenantId, id);
    if (!current) throw new Error("Rfqs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return rfqsRepository.update(tenantId, id, rfqsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: RfqsActionContext) {
    const current = await rfqsRepository.getById(tenantId, id);
    if (!current) throw new Error("Rfqs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return rfqsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await rfqsRepository.getById(tenantId, id);
    if (!record) throw new Error("Rfqs record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { customerAssetsRepository } from "./repository";
import { customerAssetsCreateSchema, customerAssetsListSchema, customerAssetsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CustomerAssetsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const customerAssetsService = {
  async list(input: unknown) {
    return customerAssetsRepository.list(customerAssetsListSchema.parse(input));
  },

  async create(input: unknown, context: CustomerAssetsActionContext) {
    const parsed = customerAssetsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return customerAssetsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CustomerAssetsActionContext) {
    const current = await customerAssetsRepository.getById(tenantId, id);
    if (!current) throw new Error("Customer Assets record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return customerAssetsRepository.update(tenantId, id, customerAssetsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CustomerAssetsActionContext) {
    const current = await customerAssetsRepository.getById(tenantId, id);
    if (!current) throw new Error("Customer Assets record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return customerAssetsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await customerAssetsRepository.getById(tenantId, id);
    if (!record) throw new Error("Customer Assets record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

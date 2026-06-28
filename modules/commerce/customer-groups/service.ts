import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { customerGroupsRepository } from "./repository";
import { customerGroupsCreateSchema, customerGroupsListSchema, customerGroupsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CustomerGroupsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const customerGroupsService = {
  async list(input: unknown) {
    return customerGroupsRepository.list(customerGroupsListSchema.parse(input));
  },

  async create(input: unknown, context: CustomerGroupsActionContext) {
    const parsed = customerGroupsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return customerGroupsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CustomerGroupsActionContext) {
    const current = await customerGroupsRepository.getById(tenantId, id);
    if (!current) throw new Error("Customer Groups record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return customerGroupsRepository.update(tenantId, id, customerGroupsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CustomerGroupsActionContext) {
    const current = await customerGroupsRepository.getById(tenantId, id);
    if (!current) throw new Error("Customer Groups record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return customerGroupsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await customerGroupsRepository.getById(tenantId, id);
    if (!record) throw new Error("Customer Groups record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

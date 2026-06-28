import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { customer360Repository } from "./repository";
import { customer360CreateSchema, customer360ListSchema, customer360UpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { Customer360ActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const customer360Service = {
  async list(input: unknown) {
    return customer360Repository.list(customer360ListSchema.parse(input));
  },

  async create(input: unknown, context: Customer360ActionContext) {
    const parsed = customer360CreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return customer360Repository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: Customer360ActionContext) {
    const current = await customer360Repository.getById(tenantId, id);
    if (!current) throw new Error("Customer 360 record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return customer360Repository.update(tenantId, id, customer360UpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: Customer360ActionContext) {
    const current = await customer360Repository.getById(tenantId, id);
    if (!current) throw new Error("Customer 360 record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return customer360Repository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await customer360Repository.getById(tenantId, id);
    if (!record) throw new Error("Customer 360 record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

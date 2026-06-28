import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { customerQualityRepository } from "./repository";
import { customerQualityCreateSchema, customerQualityListSchema, customerQualityUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CustomerQualityActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const customerQualityService = {
  async list(input: unknown) {
    return customerQualityRepository.list(customerQualityListSchema.parse(input));
  },

  async create(input: unknown, context: CustomerQualityActionContext) {
    const parsed = customerQualityCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return customerQualityRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CustomerQualityActionContext) {
    const current = await customerQualityRepository.getById(tenantId, id);
    if (!current) throw new Error("Customer Quality record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return customerQualityRepository.update(tenantId, id, customerQualityUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CustomerQualityActionContext) {
    const current = await customerQualityRepository.getById(tenantId, id);
    if (!current) throw new Error("Customer Quality record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return customerQualityRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await customerQualityRepository.getById(tenantId, id);
    if (!record) throw new Error("Customer Quality record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

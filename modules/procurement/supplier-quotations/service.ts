import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { supplierQuotationsRepository } from "./repository";
import { supplierQuotationsCreateSchema, supplierQuotationsListSchema, supplierQuotationsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SupplierQuotationsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const supplierQuotationsService = {
  async list(input: unknown) {
    return supplierQuotationsRepository.list(supplierQuotationsListSchema.parse(input));
  },

  async create(input: unknown, context: SupplierQuotationsActionContext) {
    const parsed = supplierQuotationsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return supplierQuotationsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SupplierQuotationsActionContext) {
    const current = await supplierQuotationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Supplier Quotations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return supplierQuotationsRepository.update(tenantId, id, supplierQuotationsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SupplierQuotationsActionContext) {
    const current = await supplierQuotationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Supplier Quotations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return supplierQuotationsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await supplierQuotationsRepository.getById(tenantId, id);
    if (!record) throw new Error("Supplier Quotations record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

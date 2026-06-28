import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { supplierQualityRepository } from "./repository";
import { supplierQualityCreateSchema, supplierQualityListSchema, supplierQualityUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SupplierQualityActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const supplierQualityService = {
  async list(input: unknown) {
    return supplierQualityRepository.list(supplierQualityListSchema.parse(input));
  },

  async create(input: unknown, context: SupplierQualityActionContext) {
    const parsed = supplierQualityCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return supplierQualityRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SupplierQualityActionContext) {
    const current = await supplierQualityRepository.getById(tenantId, id);
    if (!current) throw new Error("Supplier Quality record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return supplierQualityRepository.update(tenantId, id, supplierQualityUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SupplierQualityActionContext) {
    const current = await supplierQualityRepository.getById(tenantId, id);
    if (!current) throw new Error("Supplier Quality record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return supplierQualityRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await supplierQualityRepository.getById(tenantId, id);
    if (!record) throw new Error("Supplier Quality record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

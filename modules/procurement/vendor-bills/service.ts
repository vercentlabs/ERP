import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { vendorBillsRepository } from "./repository";
import { vendorBillsCreateSchema, vendorBillsListSchema, vendorBillsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { VendorBillsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const vendorBillsService = {
  async list(input: unknown) {
    return vendorBillsRepository.list(vendorBillsListSchema.parse(input));
  },

  async create(input: unknown, context: VendorBillsActionContext) {
    const parsed = vendorBillsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return vendorBillsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: VendorBillsActionContext) {
    const current = await vendorBillsRepository.getById(tenantId, id);
    if (!current) throw new Error("Vendor Bills record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return vendorBillsRepository.update(tenantId, id, vendorBillsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: VendorBillsActionContext) {
    const current = await vendorBillsRepository.getById(tenantId, id);
    if (!current) throw new Error("Vendor Bills record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return vendorBillsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await vendorBillsRepository.getById(tenantId, id);
    if (!record) throw new Error("Vendor Bills record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

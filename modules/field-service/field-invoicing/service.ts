import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { fieldInvoicingRepository } from "./repository";
import { fieldInvoicingCreateSchema, fieldInvoicingListSchema, fieldInvoicingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { FieldInvoicingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const fieldInvoicingService = {
  async list(input: unknown) {
    return fieldInvoicingRepository.list(fieldInvoicingListSchema.parse(input));
  },

  async create(input: unknown, context: FieldInvoicingActionContext) {
    const parsed = fieldInvoicingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return fieldInvoicingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: FieldInvoicingActionContext) {
    const current = await fieldInvoicingRepository.getById(tenantId, id);
    if (!current) throw new Error("Field Invoicing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return fieldInvoicingRepository.update(tenantId, id, fieldInvoicingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: FieldInvoicingActionContext) {
    const current = await fieldInvoicingRepository.getById(tenantId, id);
    if (!current) throw new Error("Field Invoicing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return fieldInvoicingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await fieldInvoicingRepository.getById(tenantId, id);
    if (!record) throw new Error("Field Invoicing record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};

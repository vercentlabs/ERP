import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { billOfMaterialsRepository } from "./repository";
import { billOfMaterialsCreateSchema, billOfMaterialsListSchema, billOfMaterialsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { BillOfMaterialsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const billOfMaterialsService = {
  async list(input: unknown) {
    return billOfMaterialsRepository.list(billOfMaterialsListSchema.parse(input));
  },

  async create(input: unknown, context: BillOfMaterialsActionContext) {
    const parsed = billOfMaterialsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return billOfMaterialsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: BillOfMaterialsActionContext) {
    const current = await billOfMaterialsRepository.getById(tenantId, id);
    if (!current) throw new Error("Bill Of Materials record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return billOfMaterialsRepository.update(tenantId, id, billOfMaterialsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: BillOfMaterialsActionContext) {
    const current = await billOfMaterialsRepository.getById(tenantId, id);
    if (!current) throw new Error("Bill Of Materials record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return billOfMaterialsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await billOfMaterialsRepository.getById(tenantId, id);
    if (!record) throw new Error("Bill Of Materials record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
